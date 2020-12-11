import {Component, OnInit} from '@angular/core';
import {DoctorService} from '../../../services/doctor/doctor.service';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {OnboardingService} from '../onboarding-service';
import {NgForm} from '@angular/forms';

@Component({
  selector: `app-practise-info`,
  templateUrl: './practise-info.component.html',
  styleUrls: ['./practise-info.component.scss'],
})
export class PractiseInfoComponent implements OnInit {
  practiseInformation: any;
  specializations: string[];
  subSpecializations: string[];
  newSubSpecialization: string;
  newSpecialization: string;
  certificateImage: string;
  specializationsObject: any;

  constructor(private doctorService: DoctorService,
              private translate: TranslateService,
              private router: Router,
              public onboardingService: OnboardingService) {
    this.specializationsObject = this.doctorService.specs;
    this.specificationsOptions(this.doctorService.specs);
  }

  ngOnInit() {
    this.practiseInformation = this.onboardingService.onboardingDetails.practiseInformation;
  }

  next(practiseForm: NgForm) {
    if (!practiseForm.valid){
      return;
    }
    this.practiseInformation.specialization = practiseForm.value.spec;
    this.practiseInformation.subSpecialization = practiseForm.value.subspec;
    this.practiseInformation.experience = practiseForm.value.exp;
    this.practiseInformation.certificateImage = practiseForm.value.cert;
    this.router.navigate(['doctor/onboarding/availability']);
  }

  prev() {
    this.router.navigate(['doctor/onboarding/basic']);
  }

  onSpecChange(s: string) {
    var subSpecs = [];
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
    var specs = [];
    for (const key in s) {
      if (s.hasOwnProperty(key)) {
        specs.push(s[key]['name_' + this.translate.currentLang]);
      }
    }
    this.specializations = specs;
  }
}
