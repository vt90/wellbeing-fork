import { Doctor, Basic } from './../../../model/doctor.model';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})

export class BasicInfoComponent implements OnInit {
  @Output() step: EventEmitter<number> = new EventEmitter<number>();
  regNo: string;
  fullName: string;
  birthDate: string;
  gender: string;
  cCode: number;
  contactNo: number;
  doctor: Doctor;
  private basic: Basic;
  basicForm: FormGroup;

  constructor(private storage: Storage,
              public formBuilder: FormBuilder) {
    this.storage.get('basic').then((obj)=>{
      console.log(obj);
    });
  }

  ngOnInit(){
    this.validateBasicForm();
  }

  validateBasicForm(){
      this.basicForm = this.formBuilder.group({
        rNo: ['', []],
        fName: ['', [Validators.required]],
        dob: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        code: ['', [Validators.required, Validators.maxLength(2)]],
        phone:['', [Validators.required, Validators.maxLength(10)]]
      })
  }

  next() {
    this.step.emit(1);
    this.basic = new Basic();
    this.basic.fullName = this.fullName;
    this.basic.dateOfBirth = this.birthDate;
    this.basic.registrationId = this.regNo;
    this.basic.gender = this.gender;
    this.basic.cCode = this.cCode;
    this.basic.contact = this.contactNo;
    this.storage.set('basic',this.basic);
  }
}
