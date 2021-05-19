import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Doctor} from '../../model/doctor.model';
import {GoogleMapsComponent} from '../../shared/components/google-maps/google-maps.component';
import {AuthUser} from '../../model/auth-user.model';
import {PatientService} from '../../services/patient/patient.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit, OnDestroy {
  patientId: string;
  doctors: Doctor[];
  user: AuthUser;
  @ViewChild(GoogleMapsComponent) mapComponent: GoogleMapsComponent;
  subscription: Subscription;

  constructor(public translate: TranslateService, public patientService: PatientService) {
  }

  ngOnInit() {
    this.subscription = this.patientService.getSearchedDoctors().subscribe(docs => {
      this.doctors = null;
      if (docs) {
        const ds = [];
        Object.keys(docs).forEach(k => {
          ds.push(docs[k]);
        });
        this.doctors = ds;
      }
    });
  }

  testMarker() {
    const center = this.mapComponent.map.getCenter();
    this.mapComponent.addMarker(center.lat(), center.lng());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}


