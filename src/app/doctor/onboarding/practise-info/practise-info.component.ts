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

  constructor(private doctorService: DoctorService,
              private translate: TranslateService,
              private router: Router,
              public onboardingService: OnboardingService) {
    this.doctorService.retrieveSpecializations().then(specs => {
      this.specializationsFromDB = specs;
      this.specificationsOptions(specs);
      console.log(this.specializations);
    });
  }

  ngOnInit() {
    this.doctor = this.onboardingService.getOnboadringDetails();
  }

  next(practiseForm: NgForm) {
    if (!practiseForm.valid) {
      return;
    }
    this.router.navigate(['doctor/onboarding/availability']);
  }

  prev() {
    this.router.navigate(['doctor/onboarding/basic']);
  }

  onSpecChange(s: string) {
    let subSpecs: string[] = [];
    for (const key in this.specializationsFromDB) {
      if (this.specializationsFromDB.hasOwnProperty(key)) {
        if (this.specializationsFromDB[key].subspecializations &&
          s === this.specializationsFromDB[key]['name_' + this.translate.currentLang]) {
          this.specializationsFromDB[key].subspecializations.forEach(s => {
            subSpecs.push(s['name_' + this.translate.currentLang]);
          });
        }
      }
    }
    this.subSpecializations = subSpecs;
  }

  specificationsOptions(s: string[]) {
    let specs = [];
    for (const key in s) {
      if (s.hasOwnProperty(key)) {
        specs.push(s[key]['name_' + this.translate.currentLang]);
      }
    }
    this.specializations = specs;
  }
}
