import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OnboardingPage} from './onboarding.page';
import {TermsAndConditionsComponent} from './terms-and-conditions/terms-and-conditions.component';


const routes: Routes = [
  {
    path: '',
    component: OnboardingPage
  },
  {
    path: 'termsConditions',
    component: TermsAndConditionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingPageRoutingModule {
}
