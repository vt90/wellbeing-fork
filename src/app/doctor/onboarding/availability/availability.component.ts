import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Details, Doctor} from '../../../model/doctor.model';
import {Clinic} from '../../../model/clinic.model';
import {Schedule} from './schedule';
import {DatePipe} from '@angular/common';
import {Storage} from '@ionic/storage';


@Component({
  selector: 'availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss'],
})
export class AvailabilityComponent implements OnInit{
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
  schedules: Schedule[];
  cFee: number;
  fFee: number;
  doctor: Doctor;

  constructor(private datePipe: DatePipe,
              private storage: Storage) {
    this.schedules =[];
  }

  ngOnInit() {
      this.storage.get('availability').then((doc)=>{
          if(doc){
              this.clinicName = doc.clinic.clinicname;
              this.addressLine1 = doc.clinic.addressLine1;
              this.addressLine2 = doc.clinic.addressLine2;
              this.city = doc.clinic.city;
              this.country = doc.clinic.country;
              this.state = doc.clinic.state;
              this.pin = doc.clinic.zipcode;
              this.schedules = doc.clinic.schedules;
              this.cFee = doc.details.consultationFee;
              this.fFee = doc.details.followupFee;
          }
      });
  }

  next() {
    this.step.emit(3);
    this.doctor = new Doctor;
    this.doctor.clinic = new Clinic();
    this.doctor.clinic.clinicname = this.clinicName;
    this.doctor.clinic.addressLine1 = this.addressLine1;
    this.doctor.clinic.addressLine2 = this.addressLine2;
    this.doctor.clinic.city = this.city;
    this.doctor.clinic.country = this.country;
    this.doctor.clinic.state = this.state;
    this.doctor.clinic.zipcode = this.pin;
    this.doctor.clinic.schedules = this.schedules;
    this.doctor.details = new Details();
    this.doctor.details.consultationFee = this.cFee;
    this.doctor.details.followupFee = this.fFee;
    this.storage.set('availability', this.doctor).then(r =>console.log(r));
  }

  prev() {
    this.step.emit(1);
  }
  addSchedule(){
      if(this.days.length === 0 || this.slots.length === 0 || this.fromTime === '' || this.toTime ===''){
          return;
      }
        let schedule = new Schedule();
        schedule.availableDays = [];
        this.days.forEach((value)=>{
            if(value.isChecked){schedule.availableDays.push(value.val);}
        });
        this.slots.forEach((value)=>{
          if(value.isChecked){schedule.slotPerPatient = value.val;}
        });
        schedule.fromTime = this.datePipe.transform(this.fromTime,'h a');
        schedule.toTime =this.datePipe.transform(this.toTime,'h a');
        this.schedules.push(schedule);
        this.clearSchedule();
  }
  private clearSchedule(){
        this.days.forEach((value)=>{
            if(value.isChecked){value.isChecked = false;}
        });
        this.slots.forEach((value)=>{
            if(value.isChecked){value.isChecked = false;}
        });
        this.fromTime = '';
        this.toTime = '';
  }

  timeSlotSelection(v: number){
        this.slots.forEach((value)=>{
            value.isChecked = value.isChecked && value.val === v;
        });
  }


}
