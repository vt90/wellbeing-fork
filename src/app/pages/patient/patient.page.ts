import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AppointmentService } from '../../services/patient/appointment.service';
import { PatientService } from '../../services/patient/patient.service';
import { Patient } from '../../model/patient.model';
import { TranslateService } from '@ngx-translate/core';
import { Doctor } from '../../model/doctor.model';
import { Subscription } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { DoctorSearchModel } from '../../model/doctor.search.model';
import { AppointmentBook } from 'src/app/model/appointment-book.model';
import moment from 'moment';
import { DoctorService } from 'src/app/services/doctor/doctor.service';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-patient',
  templateUrl: './patient.page.html',
  styleUrls: ['./patient.page.scss'],
})
export class PatientPage implements OnInit, OnDestroy {
  patient: Patient;
  patientId: string;
  searchedDoctors: Doctor[];
  subscription: Subscription;
  docDetails: Doctor;
  appointments: AppointmentBook[];
  nextAppointment: any;
  appointmentsDone: any[] = [];
  doctorsList: any[];
  doctorsListForMap: any[];
  lat: number = null;
  lng: number = null;

  constructor(
    private authService: AuthService,
    private appointmentService: AppointmentService,
    private router: Router,
    private patientService: PatientService,
    private doctorService: DoctorService,
    public translate: TranslateService
  ) {}

  loadAppointments() {
    this.appointmentService
      .getAppointments(this.patientId)
      .then((res) => {
        const appointments = Object.keys(res).map((key) => {
          const appointment = Object.assign({}, res[key], {
            id: key,
          });
          return appointment;
        });
        appointments.sort((a, b) =>
          moment(a.appointmentDate) > moment(b.appointmentDate)
            ? 1
            : moment(b.appointmentDate) > moment(a.appointmentDate)
            ? -1
            : 0
        );
        const appointmentsDone = appointments.filter((val) => {
          if (val.status === 'APPROVED' && moment() > moment(val.appointmentDate)) {
            return val;
          }
        });
        Promise.all(
          appointmentsDone.map(async (val) => {
            const doctorInfo = await this.doctorService.getDoctorOrAssistantById(val.doctorId);
            return {
              ...val,
              doctorInfo,
              appointmentDateParsed: moment(val.appointmentDate).format('DD MMMM YYYY'),
            };
          })
        ).then((val) => {
          this.appointmentsDone = val.filter((_, index) => index <= 2);
        });
        const nextAppointment = appointments.filter((val: AppointmentBook) => {
          const today = moment();
          const appointmentDay = moment(val.appointmentDate);
          if (appointmentDay >= today && val.status === 'APPROVED') {
            return val;
          }
        })[0];
        if (nextAppointment) {
          this.doctorService
            .getDoctorOrAssistantById(nextAppointment.doctorId)
            .then((doctorInfo) => {
              this.nextAppointment = {
                ...nextAppointment,
                doctorInfo,
                appointmentDateParsed: moment(nextAppointment.appointmentDate).format(
                  'DD MMMM YYYY'
                ),
              };
            });
        }
        this.appointments = appointments;
      })

      .catch((e) => {
        console.log('ERROR', e);
      });
  }
  async ngOnInit() {
    this.patientId = this.authService.userID;
    this.patientService.getPatientById(this.patientId).then((patient) => {
      this.patient = patient;
    });
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
    Geolocation.getCurrentPosition().then(
      (position) => {
        const {
          coords: { latitude, longitude },
        } = position;

        this.lat = latitude;
        this.lng = longitude;
      },
      (err) => {
        console.log(err);
        console.log('Could not initialise map');
      }
    );
  }

  onDoctorSearch(doctorSearchModel: DoctorSearchModel) {
    this.router.navigate(['/doctor-search'], {
      queryParams: {
        ...doctorSearchModel,
        lat: this.lat,
        lng: this.lng,
      },
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
