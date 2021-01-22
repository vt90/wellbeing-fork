import {AngularFireDatabase} from '@angular/fire/database';
import {Injectable} from '@angular/core';
import {Appointment} from '../../model/appointment.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private db: firebase.database.Database;

  constructor(private adb: AngularFireDatabase) {
    this.db = adb.database;
  }

  async addNewAppointment(appointment: Appointment): Promise<Appointment>{
    const snapshot = await this.db.ref('/Appointments/').push(appointment).once('value');
    return snapshot.val();
  }
}
