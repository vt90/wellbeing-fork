import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  onboardingDetails = {
    basicInformation: {
      fullName: '',
      email: '',
      contactNumber: '',
      profilePic: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pin: '',
        country: ''
      }
    },
    bioInformation: {
      bloodGroup: '',
      birthDate: '',
      gender: '',
      clinicalHistory: '',
    },
    termAndCondition: {
      accepted: false
    }
  };

  private stepsComplete = new Subject<any>();
  stepsComplete$ = this.stepsComplete.asObservable();
  doctor$: AngularFireList<any>;

  constructor(db: AngularFireDatabase,
              private router: Router) {
    this.doctor$ = db.list('/patients');
  }

  getOnboadringDetails() {
    return this.onboardingDetails;
  }

  setOnboardingDetails(onboardingDetails) {
    console.log(onboardingDetails);
    /*this.onboardingDetails = onboardingDetails;
    this.doctor$.push(this.onboardingDetails);*/
    this.router.navigate(['patient']);
  }

  complete() {
    this.stepsComplete.next(this.onboardingDetails.basicInformation);
  }
}
