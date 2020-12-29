import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {PatientService} from '../../services/patient/patient.service';
import {Patient} from '../../model/patient.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  patient: Patient = null;

  constructor(private authService: AuthService,
              private patientService: PatientService) { }

  ngOnInit() {
    const id = this.authService.userID;
    this.patientService.getPatientById(id).then(patient => {
      console.log(patient);
      this.patient = patient;
    });
  }

}
