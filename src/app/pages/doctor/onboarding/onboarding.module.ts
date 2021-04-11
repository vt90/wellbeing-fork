import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {OnboardingPageRoutingModule} from './onboarding-routing.module';

import {OnboardingPage} from './onboarding.page';
import {BasicInfoComponent} from './basic-info/basic-info.component';
import {AvailabilityComponent} from './availability/availability.component';

import {TermsAndConditionsComponent} from './terms-and-conditions/terms-and-conditions.component';
import {PractiseInfoComponent} from './practise-info/practise-info.component';
import {DatePipe} from '@angular/common';
import {StepsModule} from 'primeng/steps';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {DoctorOnboardingService} from '../../../services/doctor/doctor-onboarding-service';
import {DoctorService} from '../../../services/doctor/doctor.service';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    OnboardingPageRoutingModule,
    StepsModule,
    ToastModule,
    CardModule,
    ButtonModule,
    SharedModule,
  ],
  declarations: [OnboardingPage,
    BasicInfoComponent,
    AvailabilityComponent,
    PractiseInfoComponent,
    TermsAndConditionsComponent],
  providers: [DatePipe, MessageService, DoctorOnboardingService, DoctorService],
})
export class OnboardingPageModule {
}
