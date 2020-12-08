import {Component, OnInit} from '@angular/core';
import {Schedule} from './schedule';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {OnboardingService} from '../onboarding-service';


@Component({
  selector: 'availability',
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
  schedules: Schedule[];
  availabilityDetails: any;

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
    this.schedules = [];
  }

  ngOnInit() {
    this.availabilityDetails = this.onboardingService.onboardingDetails.availabilityDetails;
  }

  next() {
    this.router.navigate(['doctor/onboarding/assistant']);
  }

  prev() {
    this.router.navigate(['doctor/onboarding/practise']);
  }

  addSchedule() {
    if (this.days.length === 0 || this.slots.length === 0 || this.fromTime === '' || this.toTime === '') {
      return;
    }
    let schedule = new Schedule();
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
    schedule.fromTime = this.datePipe.transform(this.fromTime, 'h a');
    schedule.toTime = this.datePipe.transform(this.toTime, 'h a');
    this.schedules.push(schedule);
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
