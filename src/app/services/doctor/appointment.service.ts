import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

appintments$: AngularFireList<any> ;

constructor(db: AngularFireDatabase) {
  this.appintments$ = db.list('/appointments');
}

add(appointment:Appointment){

  this.appintments$.push({
    type: appointment.type,
    date: appointment.date,
    time: appointment.time,
    confirmed: appointment.confirmed,
    name: appointment.name,
    clinic: appointment.clinic,
    dateOfBirth: appointment.dateOfBirth,

  });
}
}
