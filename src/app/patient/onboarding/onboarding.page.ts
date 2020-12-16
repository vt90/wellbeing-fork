import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MenuItem, MessageService} from 'primeng/api';
import {OnboardingService} from './patient-onboarding-service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit, OnDestroy {
  steps: MenuItem[];
  subscription: Subscription;

  constructor(public onboardingService: OnboardingService,
              public messageService: MessageService) { }

  ngOnInit() {
    this.steps = [
      {label: 'Step 1', routerLink: '/patient/onboarding/basic'},
      {label: 'Step 2', routerLink: '/patient/onboarding/practise'},
      {label: 'Step 3', routerLink: '/patient/onboarding/termsConditions'}
    ];
    this.subscription = this.onboardingService.stepsComplete$.subscribe((basicInformation) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Process completed',
        detail: 'Dear, ' + basicInformation.fullName + ' onboarding process completed.'
      });
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
