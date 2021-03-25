import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {OnboardingPage} from './onboarding.page';
import {BasicInfoComponent} from './basic-info/basic-info.component';
import {PractiseInfoComponent} from './practise-info/practise-info.component';
import {AvailabilityComponent} from './availability/availability.component';
import {TermsAndConditionsComponent} from './terms-and-conditions/terms-and-conditions.component';

const routes: Routes = [
  {
    path: '', component: OnboardingPage, children: [
      {path: '', redirectTo: 'basic', pathMatch: 'full'},
      {path: 'basic', component: BasicInfoComponent},
      {path: 'practise', component: PractiseInfoComponent},
      {path: 'availability', component: AvailabilityComponent},
      {path: 'termsConditions', component: TermsAndConditionsComponent}
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingPageRoutingModule {
}
