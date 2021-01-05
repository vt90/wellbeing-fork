firebase = require('firebase/app');
require('firebase/database');
require('firebase/auth');

firebase.initializeApp({
    apiKey: 'AIzaSyB07oJq9-o40GunNJy1wrUdWFVZXnok32s',
    authDomain: 'wellbeing-dev.firebaseapp.com',
    databaseURL: 'https://wellbeing-dev.firebaseio.com/',
    storageBucket: 'wellbeing-dev.appspot.com'
});
const db = firebase.database();

function doctors(){
    const doctors = [
        {"fName":"FirstName1","lName":"LastName1","specialization":"Dentist","subSpecialization":"",
            clinic:[{
                "name": "clinic1", "address": "address1",
                schedule: [{"days": "Monday,Tuesday,Wednesday", "slot": 15, "fromTime": "10:00", "toTime":"13:00"},
                           {"days": "Thursday, Friday", "slot": 15, "fromTime": "17:00", "toTime":"20:00"}],
                fee:{"cFee": 100, "fFee":50}
            }]
        },
        {"fName":"FirstName2","lName":"LastName2","specialization":"Surgeon","subSpecialization":"Transplant surgeon",
            clinic:[{
                "name": "clinic2", "address": "address2",
                schedule: [{"days": "Monday,Tuesday,Wednesday", "slot": 15, "fromTime": "10:00", "toTime":"13:00"},
                    {"days": "Thursday, Friday", "slot": 15, "fromTime": "18:00", "toTime":"21:00"}],
                fee:{"cFee": 100, "fFee":50}
            }]
        },
        {"fName":"FirstName3","lName":"LastName3","specialization":"Surgeon","subSpecialization":"Thoracic surgeon",
            clinic:[{
                "name": "clinic3", "address": "address3",
                schedule: [{"days": "Monday,Tuesday,Wednesday", "slot": 15, "fromTime": "09:00", "toTime":"13:00"},
                    {"days": "Thursday, Friday", "slot": 15, "fromTime": "10:00", "toTime":"13:00"}],
                fee:{"cFee": 100, "fFee":50}
            }]
        }
    ]
    const ref = db.ref('/demoDoctors');
    console.log('got ref');
    for (let i = 0; i < doctors.length; i++) {
        const any = ref.push(null, err => {
            if (err) {
                console.log(err);
            }
        });
        any.set(JSON.parse(JSON.stringify(doctors[i])), (err) => {
            if (err) {
                console.log(err);
            }
        }).then()
            .catch(e => {
                if (e) {
                    console.log(e);
                }
            });
        console.log('write succeeded.');
    }
}
doctors();