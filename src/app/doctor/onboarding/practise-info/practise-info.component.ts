import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';
import {Specialization} from './../../../app-constants';
import { Storage } from '@ionic/storage';
import { Details, Doctor } from 'src/app/model/doctor.model';

@Component({
  selector: 'practise-info',
  templateUrl: './practise-info.component.html',
  styleUrls: ['./practise-info.component.scss'],
})
export class PractiseInfoComponent {
  @Output() step: EventEmitter<number> = new EventEmitter<number>();
  specializations = [];
  subSpecializations = [];

  specialization: string;
  subspecialization: string;
  newSubSpecialization: string;
  newSpecialization: string;
  experience: number;
  certificateCHK = true;
  certificateImage: string;
  practiseForm: FormGroup;
  doctor: Doctor;

  constructor( public formBuilder: FormBuilder,
               private storage: Storage) { }

  ngOnInit(){
    this.validatePractiseForm();
    this.specializations = [...Specialization.spec.keys()];
    this.storage.get('practise').then((doc)=>{
      if(doc){
        console.log(doc);
        this.specialization = doc.details.specialization;
        this.subspecialization = doc.details.subspecialization;
        this.experience = doc.details.experience;
      }
    });
  }

  validatePractiseForm(){
    this.practiseForm = this.formBuilder.group({
      spec: ['', [Validators.required]],
      newSpec: ['', []],
      subSpec:['', [Validators.required]],
      newSubSpec:['', []],
      experience:['', [Validators.required]],
      certificate:['', []],
      certificateImage:['', []]
    })
  }

  next(){
    this.step.emit(2);
    this.doctor = new Doctor;
    this.doctor.details = new Details
    this.doctor.details.specialization = this.specialization;
    this.doctor.details.subspecialization = this.subspecialization;
    this.doctor.details.experience = this.experience;
    this.storage.set('practise',this.doctor);
  }

  prev() {
    this.step.emit(0);
  }

  onSpecChange(){
    this.subSpecializations = Specialization.spec.get(this.specialization);
  }
}
