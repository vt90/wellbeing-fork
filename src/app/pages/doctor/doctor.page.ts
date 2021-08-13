import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DoctorService } from '../../services/doctor/doctor.service';
import { Doctor } from '../../model/doctor.model';
import { AppointmentService } from '../../services/doctor/appointment.service';
import { AppointmentBook } from 'src/app/model/appointment-book.model';
import moment from 'moment';
import { ModalController } from '@ionic/angular';
import { AddNoteComponent } from './add-note/add-note.component';
import { ViewAllNotesComponent } from './view-all-notes/view-all-notes.component';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.page.html',
  styleUrls: ['./doctor.page.scss'],
})
export class DoctorPage implements OnInit {
  doctor: Doctor;
  newPatients: number = 0;
  totalPatients: number = 0;
  todayPatients: number = 0;
  nextPatient: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    const id = this.authService.userID;
    this.loadUser();
    this.appointmentService.getAppointments(id).then((res) => {
      const appointments: AppointmentBook[] = Object.keys(res).map((key) => {
        const appointment = Object.assign({}, res[key], {
          id: key,
        });
        return appointment;
      });
      this.totalPatients = appointments.length;
      const nextAppointment = appointments.filter((val: AppointmentBook) => {
        const today = moment();
        const appointmentDay = moment(val.appointmentDate);
        if (appointmentDay >= today) {
          return val;
        }
      })[0];
      if (nextAppointment) {
        this.nextPatient = nextAppointment;
      }
      this.newPatients = appointments.filter(
        (val: AppointmentBook) => val.status !== 'PENDING' && val.status
      ).length;
      this.todayPatients = appointments.filter((val: AppointmentBook) => {
        const today = moment().format('YYYY-MM-DD');
        const appointmentDay = moment(val.appointmentDate).format('YYYY-MM-DD');
        if (today == appointmentDay) {
          return val;
        }
      }).length;
    });
  }

  onLogout() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }
  loadUser() {
    const id = this.authService.userID;
    this.doctorService.getDoctorOrAssistantById(id).then((doctor) => {
      this.doctor = doctor;
      console.log(doctor);
    });
  }

  async addNote() {
    const modal = await this.modalController.create({
      component: AddNoteComponent,
      componentProps: {
        doctorId: this.authService.userID,
        notes: this.doctor.notes || [],
      },
      presentingElement: await this.modalController.getTop(),
    });
    modal.onDidDismiss().then(() => {
      this.loadUser();
    });

    await modal.present();
  }
  async viewAllNote() {
    const modal = await this.modalController.create({
      component: ViewAllNotesComponent,
      componentProps: {
        doctorId: this.authService.userID,
        notes: this.doctor.notes || [],
      },
      presentingElement: await this.modalController.getTop(),
    });
    modal.onDidDismiss().then(() => {
      this.loadUser();
    });

    await modal.present();
  }
}
