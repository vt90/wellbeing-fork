import {Component, OnInit} from '@angular/core';
import {Patient} from '../../model/patient.model';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';

import {TermsAndConditionsComponent} from './terms-and-conditions/terms-and-conditions.component';
import {PatientService} from '../../services/patient/patient.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  patient: Patient = null;
  patientId: string;

  constructor(private router: Router,
              private authService: AuthService,
              private patientService: PatientService,
              private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.patientId = this.authService.userID;
    this.patient.email = this.authService.emailId;
    this.patient = Patient.fromUser(this.authService.user);
  }


  save(basicForm: NgForm) {
    if (!basicForm.valid) {
      return;
    }
    this.patientService.addPatient(this.patient, this.patientId);
    this.router.navigateByUrl('/patient');
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
