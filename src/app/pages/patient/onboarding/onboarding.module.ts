import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {OnboardingPageRoutingModule} from './onboarding-routing.module';
import {OnboardingPage} from './onboarding.page';
import {TermsAndConditionsComponent} from './terms-and-conditions/terms-and-conditions.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnboardingPageRoutingModule,
  ],
  declarations: [OnboardingPage, TermsAndConditionsComponent],
  providers: [DatePipe],
})
export class OnboardingPageModule {
}
