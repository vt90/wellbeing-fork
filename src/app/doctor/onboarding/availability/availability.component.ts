import {Component, OnDestroy, OnInit} from '@angular/core';

import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {DoctorOnboardingService} from '../../../services/doctor/doctor-onboarding-service';
import {Clinic, Schedule} from '../../../model/clinic.model';
import {Doctor} from '../../../model/doctor.model';
import {NgForm} from '@angular/forms';
import {Address} from '../../../model/address.model';
import {AuthService} from '../../../services/auth.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss'],
})
export class AvailabilityComponent implements OnInit, OnDestroy {
  showClinic = true;
  showAvail = false;
  showFee = false;
  clinicSetup = false;
  fromTime: string;
  toTime: string;
  doctor: Doctor;
  clinic: Clinic;
  sub: Subscription;

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


  constructor(private datePipe: DatePipe,
              private router: Router,
              private authService: AuthService,
              private onboardingService: DoctorOnboardingService) {
    /*this.clinic = new  Clinic();
    this.clinic.address = new Address();
    this.clinic.schedules = [];*/
  }

  ngOnInit() {
    this.doctor = Doctor.fromUser(this.authService.user);
    this.sub = this.onboardingService.getCurrentDoctor().subscribe(d => {
      if (!!d) {
        this.doctor = d;
        console.log('Availability Info:', d);
      }
      if (!this.doctor.clinics) {
        this.doctor.clinics = [];
        this.doctor.clinics.push(new Clinic());
        this.doctor.clinics[0].address = new Address();
        this.doctor.clinics[0].schedules = [];
      }
      else {
        this.onboardingService.setDoctor(this.doctor);
      }
    });
  }

  ngOnDestroy() {
    if (!!this.sub) {
      this.sub.unsubscribe();
    }
  }

  next(availabilityForm: NgForm) {
    if (availabilityForm.invalid){return; }
    if (this.clinic){
      this.onboardingService.setClinicData(this.clinic);
    }
    this.router.navigate(['doctor/onboarding/termsConditions']);
  }

  prev() {
    this.router.navigate(['doctor/onboarding/practise']);
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
    this.doctor.clinics[0].schedules.push(schedule);
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


  doSetup() {
    this.clinicSetup = true;
    if (!this.doctor.clinics) {
      this.doctor.clinics = [];
    }
  }
}
