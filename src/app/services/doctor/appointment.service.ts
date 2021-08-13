import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { FirebaseApiService } from '../firebase-api.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private db: firebase.database.Database;

  constructor(private adb: AngularFireDatabase, private fbAPIService: FirebaseApiService) {
    this.db = adb.database;
  }

  async getAppointments(doctorId: string) {
    const snapshot = await this.db
      .ref('/bookings/')
      .orderByChild('doctorId')
      .equalTo(doctorId)
      .once('value');
    const values = snapshot.val();
    return values;
  }

  async editAppointment(appointmentId: string, appointment: any) {
     await this.fbAPIService.put(`/bookings/${appointmentId}/`, { ...appointment });
  }

  async deleteAppointment(bookingId: string) {
     await this.fbAPIService.delete(`/bookings/${bookingId}`);
  }
}
