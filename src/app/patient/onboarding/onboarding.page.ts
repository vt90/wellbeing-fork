import {Component, OnInit} from '@angular/core';
import {Patient} from '../../model/patient.model';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {ModalController} from '@ionic/angular';
import {AddAppointmentComponent} from '../../doctor/appointment/add-appointment/add-appointment.component';
import {TermsAndConditionsComponent} from './terms-and-conditions/terms-and-conditions.component';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  patient: Patient = null;
  patient$: AngularFireList<any>;

  constructor(private router: Router,
              db: AngularFireDatabase,
              private modalCtrl: ModalController) {
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

  showTermsAndConditions(){
    this.modalCtrl.create({
      component: TermsAndConditionsComponent,
    }).then(modalElement => {
      modalElement.present();
      return modalElement.onDidDismiss();
    });
  }
}
