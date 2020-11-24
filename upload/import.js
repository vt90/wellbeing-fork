//environment = require('../src/environments/environment');
firebase = require('firebase/app');
require('firebase/database');

firebase.initializeApp( {
    apiKey: 'AIzaSyB07oJq9-o40GunNJy1wrUdWFVZXnok32s',
    authDomain: 'wellbeing-dev.firebaseapp.com',
    databaseURL: 'https://wellbeing-dev.firebaseio.com/',
    projectId: 'wellbeing-dev',
    storageBucket: 'wellbeing-dev.appspot.com'
  });
var db = firebase.database();
//var request = require('request');

function writeSpecializations(){
    console.log("here"); 
    var asJson = JSON.parse(JSON.stringify(
        {
            "name_de":"ONK",
            "name_en":"ENT"
        },
        {
            "name_de":"Physiotherapeut",
            "name_en":"Physiotherapist"
        },
        {
            "name_de":"Radiologe",
            "name_en":"Radiologist"
        },
        {
            "name_de":"Zahnarzt",
            "name_en":"Dentist"
        },
        {
            "name_de":"Chirurg",
            "name_en":"Surgeon"
        },
        {
            "name_de":"Arzt",
            "name_en":"Physician"
        }));
        db.ref('/specializations').push(asJson,function(error){
            if(error){
               console.log(error); 
            }
            else{
                console.log("Data saved successfully!"); 
            }
        });
}

/* request('https://wellbeing-dev.firebaseio.com/', function (error, response, body) {
    
    if (!error && response.statusCode == 200) {
        console.log("here");
        writeSpecializations();
        console.log(response);
    }
  }) */

 writeSpecializations();