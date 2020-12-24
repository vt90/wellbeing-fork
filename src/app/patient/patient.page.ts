import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientService} from '../services/patient/patient.service';
import {Patient} from '../model/patient.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.page.html',
  styleUrls: ['./patient.page.scss'],
})
export class PatientPage implements OnInit{
  patient: Patient;
  specializationsObject: any;
  specializations: string[];
  subSpecializations: string[];

  constructor(private authService: AuthService,
              private router: Router,
              private patientService: PatientService,
              private _Activatedroute: ActivatedRoute,
              private translate: TranslateService) {
    this.specializationsObject = this.patientService.specs;
    this.specificationsOptions(this.specializationsObject);
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

  specificationsOptions(s: any) {
    var specs = [];
    for (const key in s) {
      if (s.hasOwnProperty(key)) {
        specs.push(s[key]['name_' + this.translate.currentLang]);
      }
    }
    this.specializations = specs;
  }
}
