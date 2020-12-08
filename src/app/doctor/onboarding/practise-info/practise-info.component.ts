import {Component, OnInit} from '@angular/core';
import {DoctorService} from '../../../services/doctor/doctor.service';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {OnboardingService} from '../onboarding-service';

@Component({
  selector: `practise-info`,
  templateUrl: './practise-info.component.html',
  styleUrls: ['./practise-info.component.scss'],
})
export class PractiseInfoComponent implements OnInit {
  practiseInformation: any;
  specializations: string[];
  subSpecializations: string[];
  newSubSpecialization: string;
  newSpecialization: string;
  certificateCHK = true;
  certificateImage: string;
  specializationsObject: any;

  constructor(private doctorService: DoctorService,
              private translate: TranslateService,
              private router: Router,
              public onboardingService: OnboardingService) {
  }

  ngOnInit() {
    this.practiseInformation = this.onboardingService.onboardingDetails.practiseInformation;
    this.specializationsObject = this.doctorService.specs;
    this.specificationsOptions(this.doctorService.specs);
  }

  next() {
    this.onboardingService.onboardingDetails.practiseInformation = this.practiseInformation;
    this.router.navigate(['doctor/onboarding/availability']);
  }

  prev() {
    this.router.navigate(['doctor/onboarding/basic']);
  }

  onSpecChange(s: string) {
    const subSpecs = [];
    for (const key in this.specializationsObject) {
      if (this.specializationsObject.hasOwnProperty(key)) {
        if (this.specializationsObject[key].subspecializations &&
          s === this.specializationsObject[key]['name_' + this.translate.currentLang]) {
          for (let i = 0; i < this.specializationsObject[key].subspecializations.length; i++) {
            subSpecs.push(this.specializationsObject[key].subspecializations[i]['name_' + this.translate.currentLang]);
          }
        }
      }
    }
    this.subSpecializations = subSpecs;
  }

  specificationsOptions(s: any) {
    const specs = [];
    for (const key in s) {
      if (s.hasOwnProperty(key)) {
        specs.push(s[key]['name_' + this.translate.currentLang]);
      }
    }
    this.specializations = specs;
  }

}
