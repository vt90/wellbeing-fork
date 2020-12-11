import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OnboardingService} from '../onboarding-service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})

export class BasicInfoComponent implements OnInit {
  basicInformation: any;

  constructor(private router: Router,
              public onboardingService: OnboardingService) {
  }

  ngOnInit() {
    this.basicInformation = this.onboardingService.getOnboadringDetails().basicInformation;
  }

  next(basicForm: NgForm) {
    if (!basicForm.valid) {
      return;
    }
    this.basicInformation.regNo = basicForm.value.rNo;
    this.basicInformation.fullName = basicForm.value.fullName;
    this.basicInformation.birthDate = basicForm.value.dob;
    this.basicInformation.gender = basicForm.value.gender;
    this.basicInformation.contactNumber = basicForm.value.contact;
    this.router.navigate(['doctor/onboarding/practise']);
  }
}
