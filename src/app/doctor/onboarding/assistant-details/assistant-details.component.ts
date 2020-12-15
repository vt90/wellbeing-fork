import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {OnboardingService} from '../onboarding-service';

@Component({
  selector: 'app-assistant-details',
  templateUrl: './assistant-details.component.html',
  styleUrls: ['./assistant-details.component.scss'],
})
export class AssistantDetailsComponent implements OnInit {
  assistantDetails: any;

  constructor(private storage: Storage,
              private authService: AuthService,
              public onboardingService: OnboardingService,
              private router: Router) {
  }

  ngOnInit() {
    this.assistantDetails = this.onboardingService.onboardingDetails.assistantDetails;
  }

  next() {
    /*if (this.email !== '') {
      this.authService.signupAssistant(this.email).then(r => console.log(r));
    }*/ // to send the verified email of assistant role on email.
    this.router.navigate(['doctor/onboarding/termsConditions']);
  }

  prev() {
    this.router.navigate(['doctor/onboarding/availability']);
  }
}
