import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OnboardingService} from '../onboarding-service';
import {NgForm} from '@angular/forms';
import {Doctor} from '../../../model/doctor.model';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})

export class BasicInfoComponent implements OnInit {
  doctor: Doctor;

  constructor(private router: Router,
              public onboardingService: OnboardingService) {
  }

  ngOnInit() {
    this.doctor = this.onboardingService.getOnboadringDetails();
  }

  next(basicForm: NgForm) {
    if (!basicForm.valid) {
      return;
    }
    this.router.navigate(['doctor/onboarding/practise']);
  }
}
