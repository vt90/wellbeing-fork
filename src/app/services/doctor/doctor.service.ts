import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from '@angular/fire/database';
import {Patient} from '../../model/patient.model';
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

  addDoctor(doctor: Doctor, doctorId: string){
    this.db.ref(`doctors/` + doctorId).set(doctor, (error) => {
      if (error) {
        // The write failed...
      } else {
        console.log('Data saved successfully');
      }
    }).then(() => console.log());
  }

  async getDoctorById(doctorId: string) {
    let doctor: Doctor;
    return this.db.ref('/doctors/' + doctorId).once('value').then(
        (snapshot) => {
          doctor = snapshot.val();
          return doctor;
        });
  }

  async updateClinicData(clinic: Clinic, doctorId: string) {
    let clinics: Clinic[];
    const clinicRef = this.db.ref('/doctors/' + doctorId + '/clinics/');
    const snapshot = await clinicRef.once('value');
    clinics = snapshot.val();
    if (clinics == null) {
      clinics = [];
    }
    clinics.push(clinic);
    await clinicRef.set(clinics);
    return clinics;
  }
}
