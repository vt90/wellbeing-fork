import {AddAppointmentComponent} from './add-appointment/add-appointment.component';
import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AppointmentService} from '../../../services/doctor/appointment.service';
import {AuthService} from '../../../services/auth.service';
import {DoctorService} from '../../../services/doctor/doctor.service';
import {Clinic} from '../../../model/clinic.model';
import {Appointment} from '../../../model/appointment.model';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit{
  doctorId: string;
  clinics: Clinic[];
  clinicIndex = 0;
  appointments: Appointment[];

  constructor(private modalCtrl: ModalController,
              private authService: AuthService,
              private doctorService: DoctorService,
              private appointmentService: AppointmentService) {
  }

  ngOnInit() {
    this.doctorId = this.authService.userID;
    this.doctorService.getAllClinics(this.doctorId).then(clinics => {
      this.clinics = clinics;
    });
    this.appointmentService.getAppointments(this.doctorId, this.clinicIndex).then(r => {
      this.appointments = Object.values(r);
    });
  }

  filterChanged(event) {

  }

  addNewAppointment() {
    this.modalCtrl.create({
      component: AddAppointmentComponent,
    }).then(modalElement => {
      modalElement.present();
      return modalElement.onDidDismiss();
    }).then(resultData => {
      console.log(resultData.data);
    });
  }

  getClinicsAppointments(){
     this.appointmentService.getAppointments(this.doctorId, this.clinicIndex).then(r => {
       this.appointments = [];
       if (r){this.appointments = Object.values(r); }
     });
  }


}
