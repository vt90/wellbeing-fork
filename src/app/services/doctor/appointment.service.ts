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

    addPatientAppointment(appointment: Appointment) {
        // const timestamp = appointment.date.getTime();
        // tslint:disable-next-line:max-line-length
        /*return this.db.ref('/patient-appointment/' + appointment.patientId + '/' + timestamp).push(appointment).once('value').then(snapshot => {
            return snapshot.val();
        });*/
    }

    addDoctorAppointment(appointment: Appointment) {
       // const timestamp = appointment.date.getTime();
        // tslint:disable-next-line:max-line-length
         /*return this.db.ref('/doctor-appointment/' + appointment.doctorId + '/' + timestamp).push(appointment).once('value').then(snapshot => {
            return snapshot.val();
        });*/
    }

    getAppointmentAvailability(date: Date, doctorId: string) {
        const timestamp = date.getTime();
        return this.db.ref('/doctor-appointment/' + doctorId + '/' + timestamp + '/timeslots').once('value').then(snapshot => {
            return snapshot.val();
        });
    }

    updateAppointmentAvailability(appointment: Appointment, timeslots: any[]) {
        // const timestamp = appointment.date.getTime();
        // this.db.ref('/doctor-appointment/' + appointment.doctorId + '/' + timestamp).update({timeslots}).then(r => r);
    }
}
