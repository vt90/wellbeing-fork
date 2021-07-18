import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {PatientService} from '../../services/patient/patient.service';
import {Patient} from '../../model/patient.model';
import {TranslateService} from '@ngx-translate/core';
import {Doctor} from '../../model/doctor.model';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.page.html',
  styleUrls: ['./patient.page.scss'],
})
export class PatientPage implements OnInit, OnDestroy{
  patient: Patient;
  patientId: string;
  searchedDoctors: Doctor[];
  subscription: Subscription;
  docDetails: Doctor;

  constructor(private authService: AuthService,
              private router: Router,
              private patientService: PatientService,
              public translate: TranslateService) {
  }

  ngOnInit() {
    this.patientId = this.authService.userID;
    this.patientService.getPatientById(this.patientId).then(patient => {
      this.patient = patient;
    });
    this.subscription = this.patientService.getSearchedDoctors().subscribe(docs => {
      this.searchedDoctors = null;
      if (docs) {
        const ds = [];
        Object.keys(docs).forEach(k => {
          ds.push(docs[k]);
        });
        this.searchedDoctors = ds;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
