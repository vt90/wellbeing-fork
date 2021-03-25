import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from '@angular/fire/database';
import {Doctor} from '../../model/doctor.model';
import {Clinic} from '../../model/clinic.model';


@Injectable({
    providedIn: 'root'
})
export class DoctorService {
    private db: firebase.database.Database;

    constructor(private adb: AngularFireDatabase) {
        this.db = adb.database;
    }

    retrieveSpecializations() {
        let specs: string[];
        return this.db.ref('/specializations/').once('value').then(snapshot => {
            specs = snapshot.val();
            return specs;
        });
    }

    addDoctor(doctor: Doctor) {
        const docID = doctor.id.repeat(1); // deep copy
        delete doctor.id;
        delete doctor.email;
        delete doctor.role;
        this.db.ref(`doctors/` + docID).set(doctor, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Data saved successfully');
            }
        }).then(() => console.log());
    }

    async getDoctorOrAssistantById(doctorId: string) {
        let doctor: Doctor;
        return this.db.ref('/doctors/' + doctorId).once('value').then(
            (snapshot) => {
                doctor = snapshot.val();
                return doctor;
            });
    }

    updateClinics(clinics: Clinic[], doctorId: string) {
        return this.db.ref('/doctors/' + doctorId + '/clinics/').set(clinics);
    }

    async getAllClinics(doctorId: string) {
        let clinics = [];
        return this.db.ref('/doctors/' + doctorId + '/clinics/').once('value').then(snapshot => {
            clinics = snapshot.val();
            return clinics;
        });
    }
}
