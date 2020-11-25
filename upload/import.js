firebase = require('firebase/app');
require('firebase/database');
require('firebase/auth');

firebase.initializeApp({
  apiKey: 'AIzaSyB07oJq9-o40GunNJy1wrUdWFVZXnok32s',
  authDomain: 'wellbeing-dev.firebaseapp.com',
  databaseURL: 'https://wellbeing-dev.firebaseio.com/',
  storageBucket: 'wellbeing-dev.appspot.com'
});
var db = firebase.database();
var specializations = JSON.parse(JSON.stringify(
  [
    {
      "name_de": "ONK",
      "name_en": "ENT"
    }
    ,
    {
      "name_de": "Physiotherapeut",
      "name_en": "Physiotherapist"
    }
    ,
    {
      "name_de": "Radiologe",
      "name_en": "Radiologist"
    }
    ,
    {
      "name_de": "Zahnarzt",
      "name_en": "Dentist"
    }
    ,
    {
      "name_de": "Chirurg",
      "name_en": "Surgeon"
    }
    ,
    {
      "name_de": "Arzt",
      "name_en": "Physician"
    }
  ]));


function writeSpecializations() {
  var ref = db.ref('/specializations');
  console.log('got ref');
  var any = ref.push(null, err => {
    if (err) {
      console.log(err);
    }
  });
  any.set(specializations, (err) => {
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

writeSpecializations();

