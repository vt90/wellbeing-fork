import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
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
    },
    availabilityDetails: {
      clinicName: '',
      clinicAddress1: '',
      clinicAddress2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      schedule: '',
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

  getOnboadringDetails() {
    return this.onboardingDetails;
  }

  setOnboardingDetails(onboardingDetails) {
    this.onboardingDetails = onboardingDetails;
  }

  complete() {
    this.stepsComplete.next(this.onboardingDetails.basicInformation);
  }
}
