import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent {

  constructor(private router: Router) {
  }

  prev() {
    this.router.navigate(['patient/onboarding']);
  }
}
