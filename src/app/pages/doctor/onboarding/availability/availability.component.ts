import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {DoctorOnboardingService} from '../../../../services/doctor/doctor-onboarding-service';
import {Clinic, Schedule} from '../../../../model/clinic.model';
import {Doctor} from '../../../../model/doctor.model';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';
import {Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss'],
})
export class AvailabilityComponent implements OnInit, OnDestroy {
  expandedItems: { [key: string]: boolean } = {
    clinic: true,
    availability: false,
    fee: false,
  };
  days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  slots = [15, 30, 45, 60];

  doctor: Doctor;
  sub: Subscription;


  constructor(
    private alertCtrl: AlertController,
    private authService: AuthService,
    private datePipe: DatePipe,
    private onboardingService: DoctorOnboardingService,
    private router: Router,
    public translate: TranslateService,
  ) {
  }

  ngOnInit() {
    this.doctor = Doctor.fromUser(this.authService.user);
    this.sub = this.onboardingService.getCurrentDoctor().subscribe(d => {
      if (!!d) {
        this.doctor = d;
      }
      if (!this.doctor.clinics) {
        this.doctor.clinics = [];
        this.doctor.clinics.push(new Clinic());
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

  /**
   * @param section - section to be expanded or colapsed
   */
  toggleExpanded(section: string) {
    const isSectionExpanded = this.expandedItems[section];

    this.expandedItems = {
      ...this.expandedItems,
      [section]: !isSectionExpanded,
    };
  }

  next(availabilityForm: NgForm) {
    if (availabilityForm.invalid) {
      return;
    }

    this.doctor.clinics = this.doctor.clinics.map((clinic) => ({
      ...clinic,
      schedules: clinic.schedules.map((schedule) => ({
        ...schedule,
        fromTime: this.datePipe.transform(schedule.fromTime, 'HH:mm'),
        toTime: this.datePipe.transform(schedule.fromTime, 'HH:mm'),
      }))
    }));

    // @ts-ignore
    this.onboardingService.setDoctor(this.doctor);
    this.skip();
  }

  async skip() {
    const alert = await this.alertCtrl.create({
      header: `${this.translate.instant('ONBOARDING.Skip Clinic Setup')}?`,
      message: this.translate.instant('ONBOARDING.Information mandatory for booking'),
      buttons: [
        {
          text: this.translate.instant('COMMON.Cancel'),
          role: 'cancel',
        }, {
          text: this.translate.instant('COMMON.Confirm'),
          handler: () => {
            this.router.navigate(['doctor/onboarding/termsConditions']);
          }
        }
      ]
    });

    await alert.present();
  }

  async showSectionInfo(event: Event, section: string) {
    event.stopPropagation();
    let header: string;
    let message: string;

    switch (section) {
      case 'clinic':
        header = this.translate.instant('ONBOARDING.Clinic/Hospital Details');
        message = this.translate.instant('ONBOARDING.SECTION_INFO.Clinic');
        break;
      case 'availability':
        header = this.translate.instant('ONBOARDING.Availability');
        message = this.translate.instant('ONBOARDING.SECTION_INFO.Availability');
        break;
      case 'fee':
        header = this.translate.instant('ONBOARDING.Fee structure');
        message = this.translate.instant('ONBOARDING.SECTION_INFO.Fee');
        break;
    }

    message = `${message}<br /><br />${this.translate.instant('ONBOARDING.SECTION_INFO.Footer')}`;

    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: [
        {
          text: this.translate.instant('COMMON.Confirm'),
        },
      ],
    });

    await alert.present();
  }

  prev() {
    this.router.navigate(['doctor/onboarding/practise']);
  }

  addSchedule() {
    this.doctor.clinics[0].schedules.push(new Schedule());
  }

  removeSchedule(index) {
    this.doctor.clinics[0].schedules.splice(index, 1);
  }

  isScheduleTimeValid(schedule: Schedule) {
    return schedule.fromTime && schedule.toTime && (
      new Date(schedule.fromTime).getTime() < new Date(schedule.toTime).getTime()
    );
  }
}
