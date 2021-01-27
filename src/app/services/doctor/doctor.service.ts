import { Injectable } from '@angular/core';
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

  async addClinicData(clinic: Clinic, doctorId: string) {
    const clinicRef = this.db.ref('/doctors/' + doctorId + '/clinics/');
    clinicRef.push(clinic);
    return this.clinicsData(doctorId);
  }

  deleteClinicData(clinicId: string, doctorId: string){
    const clinicRef = this.db.ref('/doctors/' + doctorId + '/clinics/' + clinicId);
    clinicRef.remove().then(r => console.log(r));
    return this.clinicsData(doctorId);
  }

  async updateClinicData(clinic: Clinic, doctorId: string) {
    const clinicRef = this.db.ref('/doctors/' + doctorId + '/clinics/' + clinic.clinicId);
    await clinicRef.update(clinic);
    return this.clinicsData(doctorId);
  }

  private clinicsData(doctorId: string){
    return this.db.ref('/doctors/' + doctorId + '/clinics/').once('value').then(snapshot => {
      const clinics = snapshot.val();
      const c = [];
      for (const key in clinics) {
        if (clinics.hasOwnProperty(key)) {
          clinics[key].clinicId = key;
          c.push(clinics[key]);
        }
      }
      return c;
    });
  }
}
