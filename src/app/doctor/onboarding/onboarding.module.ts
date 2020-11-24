import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnboardingPageRoutingModule } from './onboarding-routing.module';

import { OnboardingPage } from './onboarding.page';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { AssistantDetailsComponent } from './assistant-details/assistant-details.component';
import { AvailabilityComponent } from './availability/availability.component';

import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { PractiseInfoComponent } from './practise-info/practise-info.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    OnboardingPageRoutingModule
  ],
  declarations: [OnboardingPage,
                 BasicInfoComponent,
                 AssistantDetailsComponent,
                 AvailabilityComponent,
                 PractiseInfoComponent,
                 TermsAndConditionsComponent]
})
export class OnboardingPageModule {}
