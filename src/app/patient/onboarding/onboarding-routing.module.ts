import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnboardingPage } from './onboarding.page';
import {BasicInfoComponent} from './basic-info/basic-info.component';
import {TermsAndConditionsComponent} from './terms-and-conditions/terms-and-conditions.component';
import {BioInfoComponent} from './bio-info/bio-info.component';

const routes: Routes = [
  {
    path: '',
    component: OnboardingPage, children: [
      {path: '', redirectTo: 'basic', pathMatch: 'full'},
      {path: 'basic', component: BasicInfoComponent},
      {path: 'bio', component: BioInfoComponent},
      {path: 'termsConditions', component: TermsAndConditionsComponent}
      ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingPageRoutingModule {}
