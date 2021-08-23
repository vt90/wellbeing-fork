import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {AppointmentService} from '../../../services/patient/appointment.service';
import {PatientService} from '../../../services/patient/patient.service';
import {TranslateService} from '@ngx-translate/core';
import {Doctor} from '../../../model/doctor.model';
import {Subscription} from 'rxjs';
import {Plugins} from '@capacitor/core';
import {DoctorSearchModel} from '../../../model/doctor.search.model';
import { AppointmentBook } from 'src/app/model/appointment-book.model';

const {Geolocation} = Plugins;

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {

  patientId: string;
  searchedDoctors: Doctor[];
  subscription: Subscription;
  docDetails: Doctor;
  appointments: AppointmentBook[];

  doctorsList: any[];
  doctorsListForMap: any[];
  lat: number = null;
  lng: number = null;

  constructor(private authService: AuthService,
              private appointmentService: AppointmentService,
              private router: Router,
              private patientService: PatientService,
              public translate: TranslateService) {
  }

  loadAppointments() {
    this.appointmentService
      .getAppointments(this.patientId)
      .then((res) => {
        this.appointments = Object.keys(res).map((key) => {
          const appointment = Object.assign({}, res[key], {
            id: key,
          });
          return appointment;
        });
      })
      .catch((e) => {
        console.log('ERROR', e);
      });
  }
  ngOnInit() {
    this.patientId = this.authService.userID;
    this.loadAppointments();

    this.subscription = this.patientService.getSearchedDoctors().subscribe((docs) => {
      this.searchedDoctors = null;
      if (docs) {
        const ds = [];
        Object.keys(docs).forEach((k) => {
          ds.push(docs[k]);
        });
        this.searchedDoctors = ds;
      }
    });
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    Geolocation
      .getCurrentPosition()
      .then((position) => {
        const { coords: { latitude, longitude } } = position;

        this.lat = latitude;
        this.lng = longitude;
      }, (err) => {
        console.log(err);
        console.log('Could not initialise map');
      });
  }

  onDoctorSearch(doctorSearchModel: DoctorSearchModel) {
    this.router.navigate(['/doctor-search'], {
      queryParams: {
        ...doctorSearchModel,
        lat: this.lat,
        lng: this.lng,
      }
    });
  }

  onMapPositionChange({ latitude, longitude }) {
    this.lat = latitude;
    this.lng = longitude;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
