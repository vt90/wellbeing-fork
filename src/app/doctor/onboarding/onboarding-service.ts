import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
import {Doctor} from '../../model/doctor.model';
import {DoctorService} from '../../services/doctor/doctor.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  doctor: Doctor = null;
  private stepsComplete = new Subject<any>();
  stepsComplete$ = this.stepsComplete.asObservable();

  constructor(db: AngularFireDatabase,
              private router: Router,
              private doctorService: DoctorService) {
    this.doctor = new Doctor();
  }

  getOnboadringDetails() {
    return this.doctor;
  }

  setOnboardingDetails(d: Doctor, doctorId: string) {
    this.doctor = d;
    this.doctorService.addDoctor(this.doctor, doctorId);
    this.router.navigate(['doctor']);
  }

  complete() {
    this.stepsComplete.next(this.doctor.fName);
  }
}
