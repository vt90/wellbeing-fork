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

  constructor(private router: Router,
              public onboardingService: OnboardingService) {
    this.isChecked = this.onboardingService.onboardingDetails.termAndCondition.accepted;
  }

  prev() {
    this.router.navigate(['doctor/onboarding/assistant']);
  }

}
