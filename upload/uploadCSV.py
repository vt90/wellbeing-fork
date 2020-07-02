import csv
import json

import requests
from getpass import getpass
import argparse

# enter here your firebase API key and project ID
gApiKey = 'AIzaSyAyMqzr7IKDV8XnB9ytJqE6XkIqjsKAU1Y'
gProjId = 'auth-template-4d292'


# This reads a csv file and puts the contents into an array of dictionaries
def readfile(name):
    p = []
    with open(name) as infile:
        reader = csv.DictReader(infile, delimiter=',')
        for row in reader:
            p.append(row)

    return p


def build_json(datalist) -> json:
    result = dict()
    for p in datalist:
        item = dict()
        for key in p.keys():
            # ignore empty fields
            if not key:
                continue
            item[key] = p[key]
        if 'id' not in item.keys():
            raise AttributeError('CSV file does not have "id" attribute')
        result[item.pop('id')] = item
    return result


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description="Upload CSV data to firebase. The CSV file is expected to have an 'id' field.")
    parser.add_argument("csvfile", type=str, help='Name of the file to upload')
    parser.add_argument("collection", type=str, help='Name of the collection in firebase to upload to')
    parser.add_argument("--login", "-l", action='store_true', help='Perform a login to firebase')
    args = parser.parse_args()

    data = build_json(readfile(args.csvfile))

# Log in. This is only necessary if your firebase rules mandate it.
    dbparam = {}
    if args.login:
        email = input("Login Email:")
        password = getpass()

        loginParam = {'key': gApiKey}
        loginData = {'email': email, 'password': password, 'returnSecureToken': 'true'}
        r = requests.post(f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword",
                          params=loginParam,
                          data=loginData)

        response = r.json()
        token = response['idToken']
        dbparam = {'auth': token}

# Push the data
    headers = {"content-type": "application/json; charset=UTF-8"}
    r = requests.put(f"https://{gProjId}.firebaseio.com/{args.collection}.json",
                     params=dbparam,
                     headers=headers,
                     json=data)
    if r.status_code == 200:
        print(f"Put collection {args.collection}: OK")
    else:
        print(r.status_code)
        print(r.headers)
        print(r.text)

