import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {OnboardingService} from '../patient-onboarding-service';

@Component({
  selector: 'app-bio-info',
  templateUrl: './bio-info.component.html',
  styleUrls: ['./bio-info.component.scss'],
})
export class BioInfoComponent implements OnInit {
  bioInformation: any;

  constructor(private router: Router,
              public onboardingService: OnboardingService) { }

  ngOnInit() {
    this.bioInformation = this.onboardingService.getOnboadringDetails().bioInformation;
  }

  next(bioForm: NgForm) {
    if (!bioForm.valid) {
      return;
    }
    this.router.navigate(['patient/onboarding/termsConditions']);
  }
  prev(){
    this.router.navigate(['patient/onboarding/basic']);
  }
}
