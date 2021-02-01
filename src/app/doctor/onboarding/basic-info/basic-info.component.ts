import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DoctorOnboardingService} from '../../../services/doctor/doctor-onboarding-service';
import {NgForm} from '@angular/forms';
import {Doctor} from '../../../model/doctor.model';
import {Subscription} from 'rxjs';
import {Address} from '../../../model/address.model';
import {AuthService} from '../../../services/auth.service';
import {Clinic} from '../../../model/clinic.model';


@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})

export class BasicInfoComponent implements OnInit, OnDestroy {
  doctor: Doctor;
  sub: Subscription;

  constructor(private router: Router,
              private authService: AuthService,
              private onboardingService: DoctorOnboardingService) {
  }

  ngOnInit() {
    this.doctor = Doctor.fromUser(this.authService.user);
    this.sub = this.onboardingService.getCurrentDoctor().subscribe(d => {
      if (!!d) {
        this.doctor = d;
        if (!this.doctor.clinics) {
          this.doctor.clinics = [];
          this.doctor.clinics.push(new Clinic());
          this.doctor.clinics[0].address = new Address();
        }
        console.log('BasicInfo:', d);
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
    this.onboardingService.setDoctor(this.doctor);
    this.router.navigate(['doctor/onboarding/practise']);
  }
}
