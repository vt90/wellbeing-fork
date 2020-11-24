firebase = require('firebase/app');
require('firebase/database');
require ('firebase/auth');

firebase.initializeApp( {
    apiKey: 'AIzaSyB07oJq9-o40GunNJy1wrUdWFVZXnok32s',
    authDomain: 'wellbeing-dev.firebaseapp.com',
    databaseURL: 'https://wellbeing-dev.firebaseio.com/',
    projectId: 'wellbeing-dev',
    storageBucket: 'wellbeing-dev.appspot.com'
  });
var db = firebase.database();
var specializations = JSON.parse(JSON.stringify(
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


function writeSpecializations(){
    console.log("Signing In..");
    firebase.auth().signInWithEmailAndPassword("meghanavmisal@gmail.com", "meghana7")
    .then((user) => {
       console.log(user.email +"signed In");
       db.ref('/specializations').push(specializations);
    })
    .catch((error) => {
        var errorCode = error.code;
        console.log("Error code"+ errorCode);
        var errorMessage = error.message; 
        console.log("Error Message"+ errorMessage);
    });
}

writeSpecializations();

function logout(){
    firebase.auth().signOut().then(function() {
        console.log("Sign-out successful");
    }).catch(function(error) {
        // An error happened.
    });
}
logout();