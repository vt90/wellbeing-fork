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

interface SpecializationInfo {
  name: string;
  value: string;
  subspecializations?: SpecializationInfo;
}

@Component({
  selector: `app-practise-info`,
  templateUrl: './practise-info.component.html',
  styleUrls: ['./practise-info.component.scss'],
})
export class PractiseInfoComponent implements OnInit, OnDestroy {
  specializations: SpecializationInfo[];
  subSpecializations: SpecializationInfo[];

  doctor: Doctor;
  sub: Subscription;
  uploadCert = true;

  private uploadFile: File = null;

  constructor(
    private authService: AuthService,
    private doctorService: DoctorService,
    private onboardingService: DoctorOnboardingService,
    private router: Router,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.doctor = Doctor.fromUser(this.authService.user);
    this.sub = this.onboardingService.getCurrentDoctor().subscribe(d => {
      if (!!d) {
        this.doctor = d;
        if (this.doctor.certificate) {
          this.uploadCert = false;
        }
      } else {
        this.onboardingService.setDoctor(this.doctor);
      }
    });

    this.setSpecializations();
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

  setUploadFile(files: any) {
    this.uploadFile = files.item(0);
    this.doctor.certificate = this.uploadFile.name;
    this.uploadCert = false;
  }

  onSpecChange(specialization: string) {
    let subSpecs: SpecializationInfo[] = [];

    if (specialization && this.specializations?.length) {
      const specializationInfo = this.specializations.find((spec) => spec.value === specialization);

      if (specializationInfo?.subspecializations) {
        // @ts-ignore
        subSpecs = specializationInfo?.subspecializations;
      }
    }

    this.subSpecializations = subSpecs;
  }

  mapSpecialization(specialization: any): SpecializationInfo {
    const specializationText = specialization[`name_${this.translate.currentLang}`];
    const subspecializations = specialization?.subspecializations;

    return {
      name: specializationText,
      value: specializationText,
      subspecializations: !!subspecializations?.length
        ? subspecializations.map((subSpec) => this.mapSpecialization(subSpec))
        : []
    };
  }

  setSpecializations() {
    this.doctorService.retrieveSpecializations()
      .then((specs) => {
        this.specializations = Object.values(specs)
          .map((specialization) => this.mapSpecialization(specialization));

        this.onSpecChange(this.doctor.specialization);
      });

  }
}
