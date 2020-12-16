import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {OnboardingService} from '../onboarding-service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent {
  isChecked: boolean;
  termsAndConditions: any;

  constructor(private router: Router,
              public onboardingService: OnboardingService) {
    this.termsAndConditions = this.onboardingService.onboardingDetails.termAndCondition;
  }

  prev() {
    this.router.navigate(['doctor/onboarding/assistant']);
  }
  save(){
    this.onboardingService.setOnboardingDetails(this.onboardingService.onboardingDetails);
  }
}
