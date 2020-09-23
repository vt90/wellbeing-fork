import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';

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
   
    type : appointment.type,
    dateTime :appointment.dateTime,
    confirmed : appointment.confirmed,
    patientId: appointment.patientId,
    clinic : appointment.clinic,

  });
}
}