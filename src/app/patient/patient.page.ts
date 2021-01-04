import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientService} from '../services/patient/patient.service';
import {Patient} from '../model/patient.model';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.page.html',
  styleUrls: ['./patient.page.scss'],
})
export class PatientPage implements OnInit{
  patient: Patient;

  constructor(private authService: AuthService,
              private router: Router,
              private patientService: PatientService,
              private _Activatedroute: ActivatedRoute) {
  }

  onLogout() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }

  ngOnInit(){
    const id = this._Activatedroute.snapshot.paramMap.get('id');
    this.patientService.getPatientById(id).then(patient => {
      this.patient = patient;
    });
  }
}
