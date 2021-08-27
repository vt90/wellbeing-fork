import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { FirebaseApiService } from '../firebase-api.service';
@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private db: firebase.database.Database;
  constructor(private adb: AngularFireDatabase, private fbAPIService: FirebaseApiService) {
    this.db = this.adb.database;
  }
  async getAppointments(patientId: string) {
    const snapshot = await this.db
      .ref('/bookings/')
      .orderByChild('patientId')
      .equalTo(patientId)
      .once('value');
    const values = snapshot.val();
    return values;
  }

  async editAppointment(appointmentId: string, appointment: any) {
    await this.fbAPIService.put(`/bookings/${appointmentId}/`, { ...appointment });
  }
}
