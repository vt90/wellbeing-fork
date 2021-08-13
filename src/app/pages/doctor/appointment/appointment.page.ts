import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppointmentService } from '../../../services/doctor/appointment.service';
import { AuthService } from '../../../services/auth.service';
import { DoctorService } from '../../../services/doctor/doctor.service';
import { Clinic } from '../../../model/clinic.model';
import { AppointmentBook } from 'src/app/model/appointment-book.model';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {
  doctorId: string;
  clinics: Clinic[];
  clinicIndex = 0;
  appointments: AppointmentBook[];
  waitingAppointments: AppointmentBook[];
  areAllAppointmentsVisible: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService
  ) {}

  loadAppointments() {
    this.appointmentService.getAppointments(this.doctorId).then((res) => {
      const appointments: AppointmentBook[] = Object.keys(res).map((key) => {
        const appointment = Object.assign({}, res[key], {
          id: key,
        });
        return appointment;
      });
      this.appointments = appointments.filter(
        (val: AppointmentBook) => val.status !== 'PENDING' && val.status
      );
      this.waitingAppointments = appointments.filter(
        (val: AppointmentBook) => val.status === 'PENDING' || !val.status
      );
    });
  }

  ngOnInit() {
    this.doctorId = this.authService.userID;
    this.doctorService.getAllClinics(this.doctorId).then((clinics) => {
      this.clinics = clinics;
    });
    this.loadAppointments();
  }

  filterChanged(event) {}

  handleAreAllAppointmentsVisible() {
    this.areAllAppointmentsVisible = !this.areAllAppointmentsVisible;
  }

  addNewAppointment() {
    this.modalCtrl
      .create({
        component: AddAppointmentComponent,
      })
      .then((modalElement) => {
        modalElement.present();
        return modalElement.onDidDismiss();
      });
  }

  getClinicsAppointments() {
    this.appointmentService.getAppointments(this.doctorId).then((r) => {
      this.appointments = [];
      if (r) {
        this.appointments = Object.values(r);
      }
    });
  }
}
