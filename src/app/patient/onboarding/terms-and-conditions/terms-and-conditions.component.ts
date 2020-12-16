import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {OnboardingService} from '../patient-onboarding-service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent implements OnInit {
  termsAndConditions: any;

  constructor(private router: Router,
              public onboardingService: OnboardingService) {
    this.termsAndConditions = this.onboardingService.onboardingDetails.termAndCondition;
  }

  ngOnInit() {}

  save(){
    this.onboardingService.setOnboardingDetails(this.onboardingService.onboardingDetails);
  }
  prev(){
    this.router.navigate(['patient/onboarding/bio']);
  }
}
