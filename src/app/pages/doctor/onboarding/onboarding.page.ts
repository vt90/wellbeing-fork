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
      {label: '', routerLink: '/doctor/onboarding/basic'},
      {label: '', routerLink: '/doctor/onboarding/practise'},
      {label: '', routerLink: '/doctor/onboarding/availability'},
      {label: '', routerLink: '/doctor/onboarding/termsConditions'}
    ];
  }
}
