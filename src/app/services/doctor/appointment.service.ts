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

  updateAppointmentAvailability(cId: string, date: Date, timeslots: any[]){
    console.log({date, timeslots});
    this.db.ref('/Availability/' + cId + '/' + date).set(timeslots).then(r => r);
  }
  addAppointment(appointment: Appointment){
    this.db.ref('/doctor-appointment/').push(appointment).once('value').then(() => {
      this.db.ref('/patient-appointment/').push(appointment);
    });
  }
}
