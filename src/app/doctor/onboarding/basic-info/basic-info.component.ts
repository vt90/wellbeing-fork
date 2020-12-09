import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OnboardingService} from '../onboarding-service';

@Component({
  selector: 'basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})

export class BasicInfoComponent implements OnInit {
  basicInformation: any;
  submitted = false;

  constructor(private router: Router,
              public onboardingService: OnboardingService) {
  }

  ngOnInit() {
    this.basicInformation = this.onboardingService.getOnboadringDetails().basicInformation;
  }

  next() {
    /*if (this.basicInformation.firstName && this.basicInformation.lastName
      && this.basicInformation.middleName && this.basicInformation.birthDate
      && this.basicInformation.regNo &&  this.basicInformation.gender
      && this.basicInformation.contactNo ) {
      this.onboardingService.onboardingDetails.basicInformation = this.basicInformation;
      this.router.navigate(['doctor/onboarding/practise']);
      return;
    }*/
    this.router.navigate(['doctor/onboarding/practise']);
    this.submitted = true;
  }
}
