import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  steps: MenuItem[];

  constructor() {}

  ngOnInit() {
    this.steps = [
      {label: 'Step 1', routerLink: '/doctor/onboarding/basic'},
      {label: 'Step 2', routerLink: '/doctor/onboarding/practise'},
      {label: 'Step 3', routerLink: '/doctor/onboarding/availability'},
      {label: 'Step 4', routerLink: '/doctor/onboarding/termsConditions'}
    ];
  }
}
