import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {OnboardingService} from '../onboarding-service';
import {Doctor} from '../../../model/doctor.model';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent {
  isChecked: boolean;
  doctor: Doctor;

  constructor(private router: Router,
              public onboardingService: OnboardingService) {
    this.doctor = this.onboardingService.getOnboadringDetails();
  }

  prev() {
    this.router.navigate(['doctor/onboarding/assistant']);
  }
  save(){
    this.onboardingService.setOnboardingDetails(this.onboardingService.doctor);
  }
}
