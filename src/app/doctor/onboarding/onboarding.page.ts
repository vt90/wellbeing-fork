import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {OnboardingService} from './onboarding-service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit, OnDestroy {
  steps: MenuItem[];
  subscription: Subscription;
  activeIndex = 0;

  constructor(public onboardingService: OnboardingService,
              public messageService: MessageService) {
  }

  ngOnInit() {
    this.steps = [
      {label: 'Step 1', routerLink: '/doctor/onboarding/basic'},
      {label: 'Step 2', routerLink: '/doctor/onboarding/practise'},
      {label: 'Step 3', routerLink: '/doctor/onboarding/availability'},
      {label: 'Step 4', routerLink: '/doctor/onboarding/assistant'},
      {label: 'Step 5', routerLink: '/doctor/onboarding/termsConditions'}
    ];
    this.subscription = this.onboardingService.stepsComplete$.subscribe((basicInformation) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Process completed',
        detail: 'Dear, ' + basicInformation.firstname + ' ' + basicInformation.lastname + ' onboarding process completed.'
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
