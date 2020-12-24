import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Patient} from '../../model/patient.model';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private db: firebase.database.Database;
  specs = [];

  constructor(private adb: AngularFireDatabase) {
    this.db = adb.database;
    const specializationRef = this.db.ref('/specializations');
    specializationRef.on('value', (snapshot) => {
      console.log(snapshot.val());
      this.specs  = snapshot.val();
    });
  }

  addPatient(patient: Patient, patientId: string){
    this.db.ref(`patients/` + patientId).set(patient, (error) => {
      if (error) {
        // The write failed...
      } else {
        console.log('Data saved successfully');
      }
    }).then(() => console.log());
  }

  getPatientById(patientId: string) {
    let patient: Patient;
    return this.db.ref('/patients/' + patientId).once('value').then(
      (snapshot) => {
        patient = snapshot.val();
        return patient;
    });
  }
}
