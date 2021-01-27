import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {OnboardingService} from '../onboarding-service';
import {Doctor} from '../../../model/doctor.model';
import {Assistant} from '../../../model/assistant.model';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-assistant-details',
  templateUrl: './assistant-details.component.html',
  styleUrls: ['./assistant-details.component.scss'],
})
export class AssistantDetailsComponent implements OnInit {
  doctor: Doctor;
  assistant: Assistant;

  constructor(private storage: Storage,
              private authService: AuthService,
              public onboardingService: OnboardingService,
              private router: Router) {
  }

  ngOnInit() {
    this.assistant = new Assistant();
    this.doctor = this.onboardingService.getOnboadringDetails();
  }

  next(assistantForm: NgForm) {
    if (assistantForm.invalid){return; }
    /*if (this.email !== '') {
      this.authService.signupAssistant(this.email).then(r => console.log(r));
    }*/ // to send the verified email of assistant role on email.
    if (this.assistant){this.doctor.assistants.push(this.assistant); }
    this.router.navigate(['doctor/onboarding/termsConditions']);
  }

  prev() {
    this.router.navigate(['doctor/onboarding/availability']);
  }
}
