import {Component, OnInit} from '@angular/core';

import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {OnboardingService} from '../onboarding-service';
import {Clinic, Schedule} from '../../../model/clinic.model';
import {Doctor} from '../../../model/doctor.model';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss'],
})
export class AvailabilityComponent implements OnInit {
  showClinic = true;
  showAvail = false;
  showFee = false;
  clinicSetup = false;
  fromTime: string;
  toTime: string;
  doctor: Doctor;
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


  constructor(private datePipe: DatePipe,
              private router: Router,
              public onboardingService: OnboardingService) {
    this.clinic = new  Clinic();
  }

  ngOnInit() {
    this.doctor = this.onboardingService.getOnboadringDetails();
  }

  next(availabilityForm: NgForm) {
    if (availabilityForm.invalid){return; }
    if (this.clinic){
      this.onboardingService.setClinicData(this.clinic);
    }
    this.router.navigate(['doctor/onboarding/assistant']);
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


}
