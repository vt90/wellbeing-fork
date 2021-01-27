import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OnboardingService} from '../onboarding-service';
import {NgForm} from '@angular/forms';
import {Doctor} from '../../../model/doctor.model';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})

export class BasicInfoComponent implements OnInit {
  doctor: Doctor;

  constructor(private router: Router,
              private authService: AuthService,
              public onboardingService: OnboardingService) {
  }

  ngOnInit() {
    this.doctor = this.onboardingService.getOnboadringDetails();
    this.doctor.email = this.authService.emailId;
  }

  next(basicForm: NgForm) {
    if (!basicForm.valid) {
      return;
    }
    this.router.navigate(['doctor/onboarding/practise']);
  }
}
