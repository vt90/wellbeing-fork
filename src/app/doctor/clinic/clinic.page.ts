import {Component, OnInit} from '@angular/core';
import {Clinic, Schedule} from '../../model/clinic.model';
import {AuthService} from '../../services/auth.service';
import {DoctorService} from '../../services/doctor/doctor.service';
import {Doctor} from '../../model/doctor.model';
import {DatePipe} from '@angular/common';
import {NgForm} from '@angular/forms';
import {AlertController} from '@ionic/angular';
import {Address} from '../../model/address.model';

@Component({
    selector: 'app-clinic',
    templateUrl: './clinic.page.html',
    styleUrls: ['./clinic.page.scss'],
})
export class ClinicPage implements OnInit {
    doctor: Doctor = null;
    userId: string;
    clinics: Clinic[];
    showClinic = true;
    showAvail = true;
    showFee = true;
    clinicSetup = false;
    fromTime: string;
    toTime: string;
    clinic: Clinic;
    editClinicData = false;

    days = [{val: 'Monday', isChecked: false},
        {val: 'Tuesday', isChecked: false},
        {val: 'Wednesday', isChecked: false},
        {val: 'Thursday', isChecked: false},
        {val: 'Friday', isChecked: false},
        {val: 'Saturday', isChecked: false},
        {val: 'Sunday', isChecked: false}];
    slots = [{val: 15, isChecked: false},
        {val: 30, isChecked: false},
        {val: 45, isChecked: false},
        {val: 60, isChecked: false}];

    constructor(private authService: AuthService,
                private doctorService: DoctorService,
                private datePipe: DatePipe,
                public alertCtrl: AlertController) {
    }

    ngOnInit() {
        this.userId = this.authService.userID;
        this.doctorService.getDoctorOrAssistantById(this.userId).then(d => {
            this.doctor = d;
            if (!this.doctor.clinics) {
                this.clinics = [];
            } else {
                this.clinics = this.doctor.clinics;
            }
        });
    }

    // this is duplicate code... any better way to do this? see availability ...
    addSchedule() {
        if (this.days.length === 0 || this.slots.length === 0 || this.fromTime === '' || this.toTime === '') {
            return;
        }
        const schedule = new Schedule();
        schedule.availableDays = [];
        this.days.forEach((value) => {
            if (value.isChecked) {
                schedule.availableDays.push(value.val);
            }
        });
        this.slots.forEach((value) => {
            if (value.isChecked) {
                schedule.slotPerPatient = value.val;
            }
        });
        schedule.fromTime = this.datePipe.transform(this.fromTime, 'HH:mm');
        schedule.toTime = this.datePipe.transform(this.toTime, 'HH:mm');
        this.clinic.schedules.push(schedule);
        this.clearSchedule();
    }

    // this is duplicate code... any better way to do this? see availability ...
    private clearSchedule() {
        this.days.forEach((value) => {
            if (value.isChecked) {
                value.isChecked = false;
            }
        });
        this.slots.forEach((value) => {
            if (value.isChecked) {
                value.isChecked = false;
            }
        });
        this.fromTime = '';
        this.toTime = '';
    }

    timeSlotSelection(v: number) {
        this.slots.forEach((value) => {
            value.isChecked = value.isChecked && value.val === v;
        });
    }

    save(clinicForm: NgForm) {
        if (clinicForm.invalid) {
            return;
        }
        if (!this.editClinicData) {
            this.clinics.push(this.clinic);
            this.doctor.clinics = this.clinics;
            this.updateClinicData();
            this.clinicSetup = false;
        }
        if (this.editClinicData) {
            this.updateClinicData();
            this.clinicSetup = false;
        }
    }

    private updateClinicData() {
        this.doctorService.updateClinics(this.clinics, this.userId)
          .then(() => {
              this.alertCtrl.create({
                  backdropDismiss: false,
                  message: 'Clinic Data saved successfully',
                  buttons: ['OK']
              }).then((alert) => {
                  alert.present().then();
                  return alert.onDidDismiss();
              });
          }, err => {
              this.alertCtrl.create({
                  backdropDismiss: false,
                  message: 'Clinic Data save FAILED ' + err.toString(),
                  buttons: ['OK']
              }).then((alert) => {
                  alert.present().then();
                  return alert.onDidDismiss();
              });
          }).then();
    }

    newClinic() {
        this.clinic = new Clinic();
        this.clinic.address = new Address();
        this.clinic.schedules = [];
        this.clinicSetup = true;
        this.editClinicData = false;
    }

    editClinic(c: Clinic) {
        this.clinic = c;
        this.clinicSetup = true;
        this.editClinicData = true;
    }

    deleteClinic(clinicIndex: number) {
        this.alertCtrl.create({
            backdropDismiss: false,
            message: 'Do you want to delete this clinic data?',
            buttons: [
                {
                    text: 'Yes',
                    handler: () => {
                        this.clinics.splice(clinicIndex, 1);
                        this.doctor.clinics = this.clinics;
                        this.updateClinicData();
                    }
                },
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {
                        console.log('No clicked');
                    }
                }
            ]
        }).then((alert) => {
            alert.present().then();
            return alert.onDidDismiss();
        });
    }
}
