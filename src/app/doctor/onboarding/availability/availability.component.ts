import {Component, EventEmitter, Output} from '@angular/core';
import {Doctor} from '../../../model/doctor.model';
import {Clinic} from '../../../model/clinic.model';
import {Schedule} from './schedule';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss'],
})
export class AvailabilityComponent {
  @Output() step: EventEmitter<number> = new EventEmitter<number>();
  showClinic = true;
  showAvail = false;
  showFee = false;
  clinicSetup = false;
  days = [{val:'Monday', isChecked:false},
          {val:'Tuesday', isChecked: false},
          {val:'Wednesday', isChecked:false},
          {val:'Thursday',isChecked: false},
          {val:'Friday', isChecked:false},
          {val:'Saturday',isChecked:false},
          {val:'Sunday',isChecked:false}];
  slots = [{val:15, isChecked:false},
           {val:30, isChecked: false},
           {val:45, isChecked:false},
           {val:60,isChecked:false}];

  clinicName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pin: number;
  country: string;
  fromTime: string;
  toTime: string;
  slotPerPatient: number;
  schedules: Schedule[];
  doctor: Doctor;

  constructor(private datePipe: DatePipe) {
    this.schedules =[];
  }

  next() {
    this.step.emit(3);
    this.doctor = new Doctor;
    this.doctor.clinic = new Clinic();
    this.doctor.clinic.clinicname = this.clinicName;
    this.doctor.clinic.address.addressLine1 = this.addressLine1;
    this.doctor.clinic.address.addressLine2 = this.addressLine2;
    this.doctor.clinic.address.city = this.city;
    this.doctor.clinic.address.country = this.country;
    this.doctor.clinic.address.state = this.state;
    this.doctor.clinic.address.zipcode = this.pin;
  }

  prev() {
    this.step.emit(1);
  }
  addSchedule(){
    let schedule = new Schedule();
    schedule.availableDays = [];
    this.days.forEach((value,index)=>{
      if(value.isChecked){
        schedule.availableDays.push(value.val);
      }
    });
    schedule.fromTime = this.datePipe.transform(this.fromTime,'h a');
    schedule.toTime =this.datePipe.transform(this.toTime,'h a');;
    this.schedules.push(schedule);
    this.clearSchedule();
  }
   private clearSchedule(){
     this.days.forEach((value,index)=>{
       if(value.isChecked){
        value.isChecked = false;
       }
     });
     this.slots.forEach((value,index)=>{
       if(value.isChecked){
         value.isChecked = false;
       }
     });
     this.fromTime = '';
     this.toTime = '';
   }
   timeSlotSelection(v: number){
      this.slots.forEach((value,index)=>{
        if(value.isChecked && value.val === v){
          value.isChecked = true;
        }
        else{
          value.isChecked = false;
        }
      });
   }
}
