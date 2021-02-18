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

    async addClinicData(clinics: Clinic[], doctorId: string) {
        const clinicRef = this.db.ref('/doctors/' + doctorId);
        await clinicRef.update(clinics);
        return this.clinicsData(doctorId);
    }

    deleteClinicData(clinicId: string, doctorId: string) {
        const clinicRef = this.db.ref('/doctors/' + doctorId + '/clinics/' + clinicId);
        clinicRef.remove().then(r => console.log(r));
        return this.clinicsData(doctorId);
    }

    async updateClinicData(clinic: Clinic, doctorId: string) {
        const clinicRef = this.db.ref('/doctors/' + doctorId + '/clinics/' + clinic.clinicId);
        await clinicRef.update(clinic);
        return this.clinicsData(doctorId);
    }

    private clinicsData(doctorId: string) {
        return this.db.ref('/doctors/' + doctorId + '/clinics/').once('value').then(snapshot => {
            /*const c = [];
            for (const key in clinics) {
              if (clinics.hasOwnProperty(key)) {
                clinics[key].clinicId = key;
                c.push(clinics[key]);
              }
            }*/
            return snapshot.val();
        });
    }

    updateDoctorData(doctor: Doctor, doctorId: string) {
        const docRef = this.db.ref('/doctors/' + doctorId);
        docRef.once('value').then(() => {
            this.db.ref('/doctors/' + doctorId + '/clinics/').update(doctor.clinics);
        });
        return this.clinicsData(doctorId);
        /* return docRef.once('value').then(snapshot => {
             console.log(snapshot.val());
             return d = snapshot.val();
         });*/
    }
}
