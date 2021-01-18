import {Component, OnInit} from '@angular/core';
import {DoctorService} from '../../../services/doctor/doctor.service';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {OnboardingService} from '../onboarding-service';
import {NgForm} from '@angular/forms';
import {Doctor} from '../../../model/doctor.model';

@Component({
  selector: `app-practise-info`,
  templateUrl: './practise-info.component.html',
  styleUrls: ['./practise-info.component.scss'],
})
export class PractiseInfoComponent implements OnInit {
  specializations: string[];
  subSpecializations: string[];
  newSubSpecialization: string;
  newSpecialization: string;
  specializationsFromDB: any;
  doctor: Doctor;
  noSubspecData = true;

  constructor(private doctorService: DoctorService,
              private translate: TranslateService,
              private router: Router,
              public onboardingService: OnboardingService) {
  }

  ngOnInit() {
    this.doctor = this.onboardingService.getOnboadringDetails();
    this.doctorService.retrieveSpecializations().then(specs => {
      this.specializationsFromDB = specs;
      this.specificationsOptions(specs);
      this.onSpecChange(this.doctor.specialization);
    });
  }

  next(practiseForm: NgForm) {
    if (!practiseForm.valid) {
      return;
    }
    this.router.navigate(['doctor/onboarding/availability']);
    this.onboardingService.setOnboardingData(this.doctor);
  }

  prev() {
    this.router.navigate(['doctor/onboarding/basic']);
  }

  onSpecChange(s: string) {
    const subSpecs: string[] = [];
    for (const key in this.specializationsFromDB) {
      if (this.specializationsFromDB.hasOwnProperty(key)) {
        if (this.specializationsFromDB[key].subspecializations &&
          s === this.specializationsFromDB[key]['name_' + this.translate.currentLang]) {
          this.specializationsFromDB[key].subspecializations.forEach(sub => {
            subSpecs.push(sub['name_' + this.translate.currentLang]);
          });
        }
      }
    }
    this.subSpecializations = subSpecs;
    this.subSpecializations.length !== 0 ? this.noSubspecData = true :  this.noSubspecData = false;
    console.log(this.subSpecializations);
  }

  specificationsOptions(s: string[]) {
    const specs = [];
    for (const key in s) {
      if (s.hasOwnProperty(key)) {
        specs.push(s[key]['name_' + this.translate.currentLang]);
      }
    }
    this.specializations = specs;
  }
}
