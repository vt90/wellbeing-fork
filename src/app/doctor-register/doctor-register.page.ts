import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AllserviceService } from '../services/allservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-register',
  templateUrl: './doctor-register.page.html',
  styleUrls: ['./doctor-register.page.scss'],
})
export class DoctorRegisterPage implements OnInit {
  // doctorRegForm: FormGroup;
  validTitle:string ='Please enter Value'

  constructor(private allServices : AllserviceService, private router: Router,public fb: FormBuilder) { }

  ngOnInit() {
    // this.doctorRegForm = this.fb.group({
    //   fullname: [''],
    //   mobile: [''],
    //   email: [''],
    //   password: [''],
    //   confirmpass: [''],
    //   registrationID: [''],
    //   hospitalName: [''],
    //   // specialization: [''],
    //   // specializationId: [''],
    //   terms: ['']

  }

  doctorRegForm = new FormGroup({
    fullname: new FormControl('',Validators.required),
    mobile: new FormControl('',[Validators.required,Validators.pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)]),
    email: new FormControl('',[Validators.required,Validators.pattern(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/)]),
    password: new FormControl('',Validators.required),
    confirmpass: new FormControl('',Validators.required),
    registrationID: new FormControl('',Validators.required),
    hospitalName: new FormControl('',Validators.required),
    specialization: new FormControl(''),
    // specializationId: new FormControl('',Validators.required),
    terms: new FormControl('',Validators.required),
  });

   get fullname(){ return this.doctorRegForm.get('fullname');}
   get mobile(){ return this.doctorRegForm.get('mobile');}
   get email(){ return this.doctorRegForm.get('email');}
   get password(){ return this.doctorRegForm.get('password');}
   get confirmpass(){ return this.doctorRegForm.get('confirmpass');}
   get registrationID(){ return this.doctorRegForm.get('registrationID');}
   get hospitalName(){ return this.doctorRegForm.get('hospitalName');}
   get specialization(){ return this.doctorRegForm.get('specialization');}
  //  get specializationId(){ return this.doctorRegForm.get('specializationId');}
   get terms(){ return this.doctorRegForm.get('terms');}

  formSubmit() {
    // alert('Entered in Submit')
    if (!this.doctorRegForm.valid) {
      return false;
    } else {
      this.allServices.createBooking(this.doctorRegForm.value).then(res => {
        console.log('*************888')
        console.log(res)
        console.log('*************888')
        this.doctorRegForm.reset();
        this.router.navigate(['/home']);
      })
        .catch(error => console.log("Form submit error",error));
    }
  }

  checkpswd = function(user:HTMLInputElement) {
    // alert(user['password'])
    // alert(user['confirmpass'])
    if(user['password'] != user['confirmpass']){
     alert('password wrong');
   }
  }
}
