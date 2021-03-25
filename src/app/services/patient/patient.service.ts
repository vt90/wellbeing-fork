import { Injectable } from '@angular/core';
import {AngularFireDatabase } from '@angular/fire/database';
import {Patient} from '../../model/patient.model';
import * as firebase from 'firebase/app';
import {Doctor} from '../../model/doctor.model';


@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private db: firebase.database.Database;

  constructor(private adb: AngularFireDatabase) {
    this.db = adb.database;
  }

  async retrieveSpecializations(){
    let specs: string[];
    return this.db.ref('/specializations/').once('value').then(snapshot => {
      specs = snapshot.val();
      return specs;
    }) ;
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

  async getPatientById(patientId: string) {
    let patient: Patient;
    return this.db.ref('/patients/' + patientId).once('value').then(
      (snapshot) => {
        patient = snapshot.val();
        return patient;
    });
  }

  // TODO THIS DOES NOT BELONG HERE
  async retrieveDoctors(){
    let doctor: Doctor[];
    return this.db.ref('/doctors/').once('value').then(snapshot => {
        doctor = snapshot.val();
        return doctor;
    });
  }

  async getDoctorsBySpecialization(specialization: string) {
    let doctor: Doctor[];
    return this.db.ref('/doctors/')
        .orderByChild('specialization')
        .equalTo(specialization).once('value').then(snapshot => {
          doctor = snapshot.val();
          return doctor;
        });
  }
}
