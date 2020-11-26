import { Address } from '../../../model/address';
import { Doctor} from '../../../model/doctor.model';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

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
  contactNo: number;
  doctor: Doctor;
  basicForm: FormGroup;

  constructor(private storage: Storage,
              public formBuilder: FormBuilder) {
    this.storage.get('basic').then((doc)=>{
      if(doc){
        console.log(doc);
        this.regNo = doc.registrationId;
        this.fullName = doc.fullName;
        this.gender = doc.gender;
        this.contactNo = doc.address.mobile;
        this.birthDate =doc.dateOfBirth;
      }
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
        phone:['', [Validators.required,Validators.minLength(10)]]
      })
  }

  next() {
    this.step.emit(1); 
    this.doctor = new Doctor;
    this.doctor.address = new Address;   
    this.doctor.fullName = this.fullName;
    this.doctor.dateOfBirth = this.birthDate;
    this.doctor.registrationId = this.regNo;
    this.doctor.gender = this.gender;
    this.doctor.address.mobile =  this.contactNo;
    this.storage.set('basic', this.doctor).then(r => console.log(r));
  }

  get phone(){
    return this.basicForm.get('phone');
  }
  get name(){
    return this.basicForm.get('fName');
  }
}
