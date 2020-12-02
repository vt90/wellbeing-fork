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

function writeSpecializations() {       /* function to upload the specialization and subspecialization*/
    const specializations =
        [
            {"name_de": "ONK", "name_en": "ENT"},
            {"name_de": "Physiotherapeut", "name_en": "Physiotherapist"},
            {"name_de": "Radiologe", "name_en": "Radiologist"},
            {"name_de": "Zahnarzt", "name_en": "Dentist"},
            {
                "name_de": "Chirurg", "name_en": "Surgeon",
                "subspecializations":
                    [
                        {"name_de": "Transplantations chirurg", "name_en": "Transplant surgeon"},
                        {"name_de": "Hepatobiliärer Chirurg", "name_en": "Hepatobiliary surgeon"},
                        {"name_de": "GI Chirurg", "name_en": "GI surgeon"},
                        {"name_de": "CVTS Chirurg", "name_en": "CVTS surgeon"},
                        {"name_de": "Thorax chirurg", "name_en": "Thoracic surgeon"},
                        {"name_de": "Bariatrischer Chirurg", "name_en": "Bariatric surgeon"},
                        {"name_de": "Schönheits chirurg", "name_en": "Plastic surgeon"},
                        {"name_de": "Kinder chirurg", "name_en": "Pediatric surgeon"},
                        {"name_de": "Neuro chirurg", "name_en": "Neuro surgeon"},
                        {"name_de": "Onco chirurg", "name_en": "Onco surgeon"},
                        {"name_de": "Onco chirurg", "name_en": "Onco surgeon"}
                    ]
            },
            {
                "name_de": "Arzt", "name_en": "Physician",
                "subspecializations":
                    [
                        {"name_de": "Ayurveda", "name_en": "Ayurveda"},
                        {"name_de": "Homöopathie", "name_en": "Homeopathy"},
                        {"name_de": "Hautspezialist", "name_en": "Skin Specialist"},
                        {"name_de": "Gastroenterologe", "name_en": "Gastroenterologist"},
                        {"name_de": "Kardiologe", "name_en": "Cardiologist"},
                        {"name_de": "Kosmetiker", "name_en": "Cosmetologist"},
                        {"name_de": "Endokrinologe", "name_en": "Endocrinologist"},
                        {"name_de": "Nephrologe", "name_en": "Nephrologist"},
                        {"name_de": "Rheumatologe", "name_en": "Rheumatologist"},
                        {"name_de": "Gynäkologin", "name_en": "Gynaecologist"},
                        {"name_de": "Augenarzt", "name_en": "Ophthalmologist"},
                        {"name_de": "Urologin", "name_en": "Urologist"}
                    ]
            }
        ];
    const ref = db.ref('/specializations');
    console.log('got ref');
    for (let i = 0; i < specializations.length; i++) {
        const any = ref.push(null, err => {
            if (err) {
                console.log(err);
            }
        });
        any.set(JSON.parse(JSON.stringify(specializations[i])), (err) => {
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
writeSpecializations();