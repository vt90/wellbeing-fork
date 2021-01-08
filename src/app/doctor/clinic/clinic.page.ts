import {Component, OnInit} from '@angular/core';
import {Clinic, Schedule} from '../../model/clinic.model';
import {AuthService} from '../../services/auth.service';
import {DoctorService} from '../../services/doctor/doctor.service';
import {Doctor} from '../../model/doctor.model';
import {DatePipe} from '@angular/common';
import {NgForm} from '@angular/forms';

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
                private datePipe: DatePipe) {
        this.clinic = new Clinic();
    }

    ngOnInit() {
        this.userId = this.authService.userID;
        this.doctorService.getDoctorById(this.userId).then(doctor => {
            this.doctor = doctor;
            this.clinics = doctor.clinics;
        });
    }

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
        this.doctorService.updateClinicData(this.clinic, this.userId).then(clinics => {
            this.clinics = clinics;
        });
    }
}
