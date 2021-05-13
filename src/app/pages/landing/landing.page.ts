import {Component, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {PatientService} from '../../services/patient/patient.service';
import {Doctor} from '../../model/doctor.model';
import {DatePipe} from '@angular/common';
import {GoogleMapsComponent} from "../../shared/components/google-maps/google-maps.component";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  patientId: string;
  specialization: string;
  subspecialization: string;
  specializations: string[];
  subSpecializations: string[] = [];
  specializationsFromDB: any;
  doctors: Doctor[];
  minDate: Date;
  maxDate: Date;
  @ViewChild(GoogleMapsComponent) mapComponent: GoogleMapsComponent;

  constructor(public translate: TranslateService,
              private patientService: PatientService,
              public datepipe: DatePipe) {
    const currentYear = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();
    this.minDate = new Date(currentYear, month, day);
    this.maxDate = new Date(currentYear, month + 1, 10);
  }

  ngOnInit() {
    this.specializationLists();
  }
  testMarker(){
    const center = this.mapComponent.map.getCenter();
    this.mapComponent.addMarker(center.lat(), center.lng());
  }
  private specializationLists() {
    this.patientService.retrieveSpecializations().then(s => {
      this.specializationsFromDB = s;
      const specs: string[] = [];
      for (const key in s) {
        if (s.hasOwnProperty(key)) {
          specs.push(s[key]['name_' + this.translate.currentLang]);
        }
      }
      this.specializations = specs;
    });
  }

  getSpecializedDoctor(s: string) {
    this.getSubSpecializationLists(s);
    const docs: Doctor[] = [];
    this.patientService.getDoctorsBySpecialization(s).then(d => {
      for (const key in d) {
        if (d.hasOwnProperty(key)) {
          docs.push(d[key]);
        }
      }
      this.doctors = docs;
    });
  }

  getSubSpecializedDoctor(s: string) {
    const docs: Doctor[] = [];
    this.patientService.getDoctorsBySubSpecialization(s).then(d => {
      for (const key in d) {
        if (d.hasOwnProperty(key)) {
          docs.push(d[key]);
        }
      }
      this.doctors = docs;
    });
  }

  getSubSpecializationLists(s: string) {
    this.subSpecializations = [];
    const subSpecs: string[] = [];
    for (const key in this.specializationsFromDB) {
      if (this.specializationsFromDB.hasOwnProperty(key)) {
        if (this.specializationsFromDB[key].subspecializations &&
          s === this.specializationsFromDB[key]['name_' + this.translate.currentLang]) {
          this.specializationsFromDB[key].subspecializations.forEach(sub => {
            subSpecs.push(sub['name_' + this.translate.currentLang]);
          });
        }
      }
    }
    this.subSpecializations = subSpecs;
  }
}
