import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Doctor } from '../../model/doctor.model';
import { Assistant } from '../../model/assistant.model';
import { Clinic } from '../../model/clinic.model';
import { FirebaseApiService } from '../firebase-api.service';
import { DoctorSearchModel } from '../../model/doctor.search.model';
import { DoctorBookModel } from '../../model/doctor.book.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private db: firebase.database.Database;

  constructor(
    private adb: AngularFireDatabase,
    private fns: AngularFireFunctions,
    private fbAPIService: FirebaseApiService
  ) {
    this.db = adb.database;
  }

  retrieveSpecializations() {
    let specs: string[];
    return this.db
      .ref('/specializations/')
      .once('value')
      .then((snapshot) => {
        specs = snapshot.val();
        return specs;
      });
  }

  addDoctor(doctor: Doctor) {
    const docID = doctor.id.repeat(1); // deep copy
    delete doctor.id;
    delete doctor.email;
    delete doctor.role;
    this.db
      .ref(`doctors/` + docID)
      .set(doctor, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Data saved successfully');
        }
      })
      .then(() => console.log());
  }

  findDoctors(doctorSearchModel: DoctorSearchModel) {
    return this.fbAPIService.post('/doctors/find', doctorSearchModel);
  }
  findDoctorById(doctorId: string) {
    return this.fbAPIService.get(`/doctors/${doctorId}/find`);
  }

  bookDoctor(doctorId, doctorBookModel: DoctorBookModel) {
    return this.fbAPIService.post(`/doctors/${doctorId}/book`, doctorBookModel);
  }

  getDoctorAvailability(doctorId, doctorBookModel: DoctorBookModel) {
    return this.fbAPIService.post(`/doctors/${doctorId}/get-availability`, doctorBookModel);
  }

  editDoctorInfo(id: string, doctorInfo: any) {
    return this.fbAPIService.put(`/doctors/${id}`, doctorInfo);
  }
  addAssistant(assistant: Assistant) {
    return this.fbAPIService.post('/auth/assistant', assistant);
  }

  editAssistant(assistantId: string, assistant: Assistant) {
    return this.fbAPIService.put(`/auth/assistant/${assistantId}`, assistant);
  }

  deleteAssistant(assistantId: string) {
    return this.fbAPIService.delete(`/auth/assistant/${assistantId}`);
  }

  async getDoctorsAssistants(doctorId) {
    let assistants: Assistant[];
    return this.db
      .ref('/assistants/')
      .orderByChild('doctorId')
      .equalTo(doctorId)
      .once('value')
      .then((snapshot) => {
        assistants = snapshot.val();
        return Object.keys(assistants).map((key) => ({
          id: key,
          ...assistants[key],
        }));
      });
  }

  async getDoctorOrAssistantById(doctorId: string) {
    let doctor: Doctor;
    return this.db
      .ref('/doctors/' + doctorId)
      .once('value')
      .then((snapshot) => {
        doctor = snapshot.val();
        return doctor;
      });
  }

  updateClinics(clinics: Clinic[], doctorId: string) {
    return this.db.ref('/doctors/' + doctorId + '/clinics/').set(clinics);
  }

  async getAllClinics(doctorId: string) {
    let clinics = [];
    return this.db
      .ref('/doctors/' + doctorId + '/clinics/')
      .once('value')
      .then((snapshot) => {
        clinics = snapshot.val();
        return clinics;
      });
  }
}
