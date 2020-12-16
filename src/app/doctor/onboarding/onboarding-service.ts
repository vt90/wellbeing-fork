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
      regNo: '',
      fullName: '',
      birthDate: '',
      gender: '',
      contactNumber: ''
    },
    practiseInformation: {
      specialization: '',
      subSpecialization: '',
      experience: '',
      certificateImage: ''
    },
    availabilityDetails: {
      clinicName: '',
      clinicAddress1: '',
      clinicAddress2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      schedule: null,
      consultationFee: '',
      followupFee: '',
    },
    assistantDetails: {
      name: '',
      email: '',
      contactNumber: '',
      gender: ''
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
    this.doctor$ = db.list('/doctors');
  }

  getOnboadringDetails() {
    return this.onboardingDetails;
  }

  setOnboardingDetails(onboardingDetails) {
    console.log(onboardingDetails);
    this.onboardingDetails = onboardingDetails;
    this.doctor$.push(this.onboardingDetails);
    this.router.navigate(['doctor']);
  }

  complete() {
    this.stepsComplete.next(this.onboardingDetails.basicInformation);
  }
}
