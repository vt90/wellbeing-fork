import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {DoctorOnboardingService} from '../../../../services/doctor/doctor-onboarding-service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent {
  isChecked: boolean;
  termsAndConditions: boolean;

  constructor(
    public onboardingService: DoctorOnboardingService,
    private router: Router,
    private translate: TranslateService,
  ) {
  }

  prev() {
    this.router.navigate(['doctor/onboarding/availability']);
  }
  save(){
    this.onboardingService.saveDoctorToDB(Date.now().toString());
  }
}
