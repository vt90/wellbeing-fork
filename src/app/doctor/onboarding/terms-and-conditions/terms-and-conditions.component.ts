import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DoctorOnboardingService} from '../../../services/doctor/doctor-onboarding-service';
import {Doctor} from '../../../model/doctor.model';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent implements OnInit{
  isChecked: boolean;
  doctor: Doctor;
  doctorId: string;

  constructor(private router: Router,
              public onboardingService: DoctorOnboardingService,
              private authService: AuthService) {
    this.doctor = this.onboardingService.getCurrentDoctor();
  }

  ngOnInit() {
     this.doctorId = this.authService.userID;
  }

  prev() {
    this.router.navigate(['doctor/onboarding/assistant']);
  }
  save(){
    this.onboardingService.saveDoctorToDB();
  }
}
