import {Component, OnDestroy, OnInit} from '@angular/core';
import {DoctorService} from '../../../../services/doctor/doctor.service';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {DoctorOnboardingService} from '../../../../services/doctor/doctor-onboarding-service';
import {NgForm} from '@angular/forms';
import {Doctor} from '../../../../model/doctor.model';
import {Address} from '../../../../model/address.model';
import {AuthService} from '../../../../services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: `app-practise-info`,
  templateUrl: './practise-info.component.html',
  styleUrls: ['./practise-info.component.scss'],
})
export class PractiseInfoComponent implements OnInit, OnDestroy {
  specializations: string[];
  subSpecializations: string[];
  newSubSpecialization: string;
  newSpecialization: string;
  specializationsFromDB: any;
  doctor: Doctor;
  noSubspecData = true;
  sub: Subscription;
  private uploadFile: File = null;
  uploadCert = true;

  constructor(private translate: TranslateService,
              private router: Router,
              private authService: AuthService,
              private doctorService: DoctorService,
              private onboardingService: DoctorOnboardingService) {
  }

  ngOnInit() {
    this.doctor = Doctor.fromUser(this.authService.user);
    this.sub = this.onboardingService.getCurrentDoctor().subscribe(d => {
      if (!!d) {
        this.doctor = d;
        if (this.doctor.certificate) {
          this.uploadCert = false;
        }
        console.log('PracticeInfo:', d);
      } else {
        this.onboardingService.setDoctor(this.doctor);
      }
    });
    this.doctorService.retrieveSpecializations().then(specs => {
      this.specializationsFromDB = specs;
      this.specificationsOptions(specs);
      this.onSpecChange(this.doctor.specialization);
    });
  }

  ngOnDestroy() {
    if (!!this.sub) {
      this.sub.unsubscribe();
    }
  }

  next(practiseForm: NgForm) {
    if (!practiseForm.valid) {
      return;
    }
    this.onboardingService.setDoctor(this.doctor);
    this.onboardingService.setCertFile(this.uploadFile);
    this.router.navigate(['doctor/onboarding/availability']);
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

  setUploadFile(files: any) {
    this.uploadFile = files.item(0);
    this.doctor.certificate = this.uploadFile.name;
    this.uploadCert = false;
  }
}
