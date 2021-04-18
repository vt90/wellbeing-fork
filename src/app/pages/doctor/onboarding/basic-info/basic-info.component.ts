import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DoctorOnboardingService} from '../../../../services/doctor/doctor-onboarding-service';
import {NgForm} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {Doctor} from '../../../../model/doctor.model';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../services/auth.service';


@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})

export class BasicInfoComponent implements OnInit, OnDestroy {
  doctor: Doctor;
  sub: Subscription;

  constructor(
    private authService: AuthService,
    private onboardingService: DoctorOnboardingService,
    private router: Router,
    public translate: TranslateService,
  ) {}

  ngOnInit() {
    this.doctor = Doctor.fromUser(this.authService.user);
    this.sub = this.onboardingService.getCurrentDoctor().subscribe(d => {
      if (!!d) {
        this.doctor = d;
        this.doctor.fullName = [d.firstName, d.lastName]
          .filter((name) => !!name)
          .join(' ');
      } else {
        this.onboardingService.setDoctor(this.doctor);
      }
    });
  }

  ngOnDestroy() {
    if (!!this.sub) {
      this.sub.unsubscribe();
    }
  }

  next(basicForm: NgForm) {
    if (!basicForm.valid) {
      return;
    }
    const [firstName, ...lastName] = this.doctor.fullName.split(' ');

    // @ts-ignore
    this.onboardingService.setDoctor({
      ...this.doctor,
      firstName,
      lastName: lastName.join(' '),
    });
    this.router.navigate(['doctor/onboarding/practise']);
  }
}
