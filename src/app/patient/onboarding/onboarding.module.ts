import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnboardingPageRoutingModule } from './onboarding-routing.module';

import { OnboardingPage } from './onboarding.page';
import {StepsModule} from 'primeng/steps';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {OnboardingService} from './patient-onboarding-service';
import {BasicInfoComponent} from './basic-info/basic-info.component';
import {BioInfoComponent} from './bio-info/bio-info.component';
import {TermsAndConditionsComponent} from './terms-and-conditions/terms-and-conditions.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnboardingPageRoutingModule,
    StepsModule,
    ToastModule,
    CardModule,
    ButtonModule,
  ],
  declarations: [OnboardingPage, BasicInfoComponent, BioInfoComponent, TermsAndConditionsComponent],

  providers: [DatePipe, MessageService, OnboardingService],
})
export class OnboardingPageModule {}
