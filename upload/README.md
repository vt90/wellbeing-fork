# Uploading CSV file to firebase using python

The csv files need to have an 'id' field.
The uploadCSV script takes two arguments and you can specify 
whether to perform a log in or not (depending on your firebase authorization rules.)

Usage:

    usage: uploadCSV.py [-h] [--login] csvfile collection

    Upload CSV data to firebase. The CSV file is expected to have an 'id' field.

    positional arguments:
      csvfile      Name of the file to upload
      collection   Name of the collection in firebase to upload to

    optional arguments:
      -h, --help   show this help message and exit
      --login, -l  Perform a login to firebase

The two specializations files are already here.
For example to upload the specializations to firebase in a collection named specializations just do

    python uploadCSV.py specializations.py specializations

If you need to log in then just add the `-l` parameter.