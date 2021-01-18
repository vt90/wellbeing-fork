import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
import {Doctor} from '../../model/doctor.model';
import {DoctorService} from '../../services/doctor/doctor.service';
import {Clinic} from '../../model/clinic.model';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  doctor: Doctor = new Doctor();
  private stepsComplete = new Subject<any>();
  stepsComplete$ = this.stepsComplete.asObservable();
  clinic: Clinic = null;

  constructor(db: AngularFireDatabase,
              private router: Router,
              private doctorService: DoctorService) {
  }

  getOnboadringDetails() {
    return this.doctor;
  }

  setOnboardingDetails(d: Doctor, doctorId: string) {
    this.doctor = d;
    this.doctorService.addDoctor(this.doctor, doctorId);
    this.doctorService.addClinicData(this.clinic, doctorId).then(r => console.log(r));
    this.router.navigate(['doctor']);
  }

  complete() {
    this.stepsComplete.next(this.doctor.fName);
  }

  setClinicData(c: Clinic){
    this.clinic = c;
  }
  setOnboardingData(d: Doctor){
    this.doctor = d;
    console.log(this.doctor);
  }
}
