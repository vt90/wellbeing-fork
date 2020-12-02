import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Storage } from '@ionic/storage';
import { Details, Doctor } from 'src/app/model/doctor.model';
import {DoctorService} from '../../../services/doctor/doctor.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'practise-info',
  templateUrl: './practise-info.component.html',
  styleUrls: ['./practise-info.component.scss'],
})
export class PractiseInfoComponent implements OnInit{
  @Output() step: EventEmitter<number> = new EventEmitter<number>();
  specializations: string[];
  subSpecializations: string[];
  specialization: string;
  subSpecialization: string;
  newSubSpecialization: string;
  newSpecialization: string;
  experience: number;
  certificateCHK = true;
  certificateImage: string;
  practiseForm: FormGroup;
  doctor: Doctor;
  specializationsObject : any;

  constructor( public formBuilder: FormBuilder,
               private storage: Storage,
               private doctorService: DoctorService,
               private translate: TranslateService) {
    this.storage.get('practise').then((doc)=>{
      if(doc){
        this.specialization = doc.details.specialization;
        this.subSpecialization = doc.details.subspecialization;
        this.experience = doc.details.experience;
      }
    });
  }

  ngOnInit(){
    this.validatePractiseForm();
    this.specificationsOptions(this.doctorService.specs);
    this.specializationsObject = this.doctorService.specs;
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
    this.doctor.details = new Details;
    this.doctor.details.specialization = this.specialization;
    this.doctor.details.subspecialization = this.subSpecialization;
    this.doctor.details.experience = this.experience;
    this.storage.set('practise', this.doctor).then(r =>console.log(r));
  }

  prev() {
    this.step.emit(0);
  }

  onSpecChange(s: string){
    //this.subSpecialization = '';
    let subSpecs = [];
    for (let key in this.specializationsObject) {
      if (this.specializationsObject.hasOwnProperty(key)) {
        if(this.specializationsObject[key].subspecializations &&
            s === this.specializationsObject[key]["name_"+this.translate.currentLang]){
            for(let i =0; i < this.specializationsObject[key].subspecializations.length; i++) {
              subSpecs.push(this.specializationsObject[key].subspecializations[i]["name_" + this.translate.currentLang]);
            }
        }
      }
    }
    this.subSpecializations = subSpecs;
  }

  specificationsOptions(s: any){
    let specs = [];
    for (let key in s) {
      if (s.hasOwnProperty(key)) {
        specs.push(s[key]["name_"+this.translate.currentLang]);
      }
    }
    this.specializations = specs;
  }

}
