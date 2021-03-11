import {AngularFireDatabase} from '@angular/fire/database';
import {Injectable} from '@angular/core';
import {Appointment} from '../../model/appointment.model';
import * as firebase from 'firebase';
import {AuthUser} from "../../model/auth-user.model";

@Injectable({
    providedIn: 'root'
})

export class AppointmentService {
    private db: firebase.database.Database;

    constructor(private adb: AngularFireDatabase) {
        this.db = adb.database;
    }

    getAppointmentAvailability(date: Date, doctorId: string) {
        const timestamp = date.getTime();
        return this.db.ref('/doctor-appointment/' + doctorId + '/' + timestamp + '/timeslots').once('value').then(snapshot => {
            return snapshot.val();
        });
    }

    updateAppointmentAvailability(appointment: Appointment, timeslots: any[]) {
         const timestamp = appointment.date;
         this.db.ref('/doctor-appointment/' + appointment.doctorId + '/' + timestamp).update({timeslots}).then(r => r);
    }

    addAppointment(appointment: Appointment){
        return this.db.ref('/new-appointments/').push(appointment);
    }
}
