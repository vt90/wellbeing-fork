import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Patient} from '../../model/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  patients$: AngularFireList<any>;

  constructor(db: AngularFireDatabase) {
    this.patients$ = db.list('/patients');
  }

  addPatient(patient: Patient){
    this.patients$.push(patient);
  }
}
