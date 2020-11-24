import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage {

  step = 0;

  constructor() {
  }

  continue() {
    // todo: navigate to next page
    console.log('done, next');
  }

}
