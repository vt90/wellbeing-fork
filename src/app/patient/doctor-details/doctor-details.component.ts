import {Component, Input, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {Doctor} from '../../model/doctor.model';
import {Clinic, Schedule} from '../../model/clinic.model';
import {Appointment} from '../../model/appointment.model';
import {AppointmentService} from '../../services/doctor/appointment.service';
import moment from 'moment';

@Component({
    selector: 'app-doctor-details',
    templateUrl: './doctor-details.component.html',
    styleUrls: ['./doctor-details.component.scss'],
})
export class DoctorDetailsComponent implements OnInit {
    @Input() doc: Doctor;
    @Input() pId: string;
    clinics: Clinic[];
    timeslot: Map<string, Map<string, any[]>> = new Map<string, Map<string, any[]>>();
    day = '';
    minDate: Date;
    maxDate: Date;
    appointmentDate: Date;
    dateInvalidMessage = '';
    showAppointmentSlots = false;
    clinicIndex = 0;
    appointment: Appointment;
    updatedAppointmentSlots = false;
    updatedTimeslots: any[];

    constructor(private modalCtrl: ModalController,
                private appointmentService: AppointmentService,
                public alertCtrl: AlertController) {
        this.appointment = new Appointment();
        const currentYear = new Date().getFullYear();
        const month = new Date().getMonth();
        const day = new Date().getDate();
        this.minDate = new Date(currentYear, month, day);
        this.maxDate = new Date(currentYear, 1, 10);
    }

    ngOnInit() {
        this.getClinics();
    }

    getClinics() {
        const c = [];
        for (const key in this.doc.clinics) {
            if (this.doc.clinics.hasOwnProperty(key)) {
                this.doc.clinics[key].clinicId = key;
                c.push(this.doc.clinics[key]);
                this.getDayWiseSchedule(this.doc.clinics[key]);
            }
        }
        this.clinics = c;
    }

    close() {
        this.alertCtrl.create({
            backdropDismiss: false,
            message: 'Are you sure to close the appointment window?',
            buttons: [
                {
                    text: 'Yes',
                    role: 'cancel',
                    handler: () => {
                        this.modalCtrl.dismiss();
                    }
                },
                {
                    text: 'No',
                    handler: () => {
                    }
                }
            ],
        }).then((alert) => {
            alert.present();
            return alert.onDidDismiss();
        });
    }

    getTimeStops(s: Schedule): any[] {
        const timeStops = [];
        /* s.forEach(sc => {*/
        const startTime = moment(s.fromTime, 'HH:mm');
        const endTime = moment(s.toTime, 'HH:mm');
        if (endTime.isBefore(startTime)) {
            endTime.add(1, 'day');
        }
        while (startTime <= endTime) {
            // @ts-ignore
            timeStops.push({slot: new moment(startTime).format('HH:mm'), isBooked: false});
            startTime.add(s.slotPerPatient, 'minutes');
        }
        /* });*/
        return timeStops;
    }

    getDayWiseSchedule(c: Clinic) {
        const t: Map<string, string[]> = new Map<string, string[]>();
        c.schedules.forEach(s => {
            s.availableDays.forEach(d => {
                t.set(d, this.getTimeStops(s));
            });
        });
        this.timeslot.set(c.clinicId, t);
    }

    getKeys(map: Map<string, string[]>) {
        return Array.from(map.keys());
    }

    checkValidDate(c: Clinic) {
        let weekOfDay = 0;
        this.dateInvalidMessage = '';
        switch (this.day) {
            case 'Monday':
                weekOfDay = 1;
                break;
            case 'Tuesday':
                weekOfDay = 2;
                break;
            case 'Wednesday':
                weekOfDay = 3;
                break;
            case 'Thursday':
                weekOfDay = 4;
                break;
            case 'Friday':
                weekOfDay = 5;
                break;
            case 'Saturday':
                weekOfDay = 6;
                break;
            case 'Sunday':
                weekOfDay = 7;
                break;
        }
        if (this.appointmentDate) {
            if (weekOfDay !== this.appointmentDate.getDay()) {
                this.dateInvalidMessage = 'Please Select valid date';
                this.appointmentDate = null;
                this.showAppointmentSlots = false;
                this.appointment.time = undefined;
            } else {
                this.appointmentService.getAppointmentAvailability(this.appointmentDate, this.doc.id).then(t => {
                    if (t){
                        this.updatedAppointmentSlots = true;
                        this.updatedTimeslots = t;
                    }
                    else{
                        this.updatedAppointmentSlots = false;
                    }
                });
                this.showAppointmentSlots = true;
                this.appointment.date = this.appointmentDate;
                this.appointment.clinicId = c.clinicId;
                this.appointment.doctorId = this.doc.id;
                this.appointment.patientId = this.pId;
            }
        }
    }

    bookAppointment() {
        this.appointmentService.addDoctorAppointment(this.appointment).then(() => {
            this.alertCtrl.create({
                backdropDismiss: false,
                message: 'Appointment Booked!!!!',
                buttons: ['OK']
            }).then((alert) => {
                this.appointmentService.addPatientAppointment(this.appointment).then((a) => {
                    console.log(a);
                });
                alert.present();
                this.modalCtrl.dismiss();
                return alert.onDidDismiss();
            });
        }).then(() => {
            if (!this.updatedAppointmentSlots){
                this.updatedTimeslots = this.timeslot.get(this.appointment.clinicId).get(this.day);
            }
            this.appointmentService.updateAppointmentAvailability(this.appointment, this.updatedTimeslots);
        });
    }

    showMoreClinics(){
        for ( let i = 1; i < this.clinics.length; i++){
            this.clinicIndex = 1;
        }
    }
}
