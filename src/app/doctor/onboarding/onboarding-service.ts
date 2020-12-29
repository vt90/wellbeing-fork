import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Router} from '@angular/router';
import {Doctor} from '../../model/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  doctor: Doctor = null;
  private stepsComplete = new Subject<any>();
  stepsComplete$ = this.stepsComplete.asObservable();
  doctor$: AngularFireList<any>;

  constructor(db: AngularFireDatabase,
              private router: Router) {
    this.doctor = new Doctor();
    this.doctor$ = db.list('/doctors');
  }

  getOnboadringDetails() {
    return this.doctor;
  }

  setOnboardingDetails(d: Doctor) {
    console.log(d);
    this.doctor = d;
    this.doctor$.push(this.doctor);
    this.router.navigate(['doctor']);
  }

  complete() {
    this.stepsComplete.next(this.doctor.fName);
  }
}
