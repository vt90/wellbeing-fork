import {Component, OnInit} from '@angular/core';
import {Patient} from '../../model/patient.model';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  patient: Patient = null;
  patient$: AngularFireList<any>;

  constructor(private router: Router,
              db: AngularFireDatabase) {
    this.patient$ = db.list('/patients');
  }

  ngOnInit() {
    this.patient = new Patient();
  }

  next(basicForm: NgForm) {
    if (!basicForm.valid) {
      return;
    }
    this.patient$.push(this.patient);
    this.router.navigate(['patient']);
  }
}
