import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
import {Doctor} from '../../model/doctor.model';
import {DoctorService} from './doctor.service';
import {Clinic} from '../../model/clinic.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorOnboardingService {

  clinic: Clinic = null;
  currentDoctor = new BehaviorSubject<Doctor>(null);

  constructor(db: AngularFireDatabase,
              private router: Router,
              private doctorService: DoctorService) {
  }

  getCurrentDoctor() {
    return this.currentDoctor.asObservable();
  }

  saveDoctorToDB() {
    this.doctorService.addDoctor(this.currentDoctor.getValue());
    this.doctorService.addClinicData(this.clinic, this.currentDoctor.getValue().id).then(r => console.log(r));
    this.router.navigate(['doctor']).then();
  }

  setClinicData(c: Clinic){
    this.clinic = c;
  }

  setDoctor(d: Doctor){
    this.currentDoctor.next(d);
  }
}
