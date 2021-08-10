import { Component, OnInit, Input } from '@angular/core';
import { AppointmentBook } from 'src/app/model/appointment-book.model';
import moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { AppointmentService } from '../../../services/patient/appointment.service';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Output, EventEmitter } from '@angular/core';
import { DoctorService } from '../../../services/doctor/doctor.service';
import { AppointmentRescheduleComponent } from './appointment-reschedule/appointment-reschedule.component';

@Component({
  selector: 'app-appointment-card',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.scss'],
})
export class AppointmentCardComponent implements OnInit {
  @Input() appointment: AppointmentBook;
  @Output() reloadData = new EventEmitter();
  @Input() isDoctor: boolean;
  status: string;
  years: number;
  day: string;
  time: string;
  isAppointmentStatusDisabled: boolean;
  constructor(
    public translate: TranslateService,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    public alertController: AlertController,
    public modalController: ModalController,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.status = this.appointment.status || 'PENDING';
    const years =
      this.appointment.dateOfBirth && moment().diff(this.appointment.dateOfBirth, 'years');
    if (years) {
      this.years = years;
    }
    const date = moment(this.appointment.appointmentDate);
    this.day = date.format('DD MMMM YYYY');
    this.time = date.format('HH:mm');
    this.isAppointmentStatusDisabled = this.isDoctor ? false : true;
  }
  onChange(event) {
    const status = event.target.value;
    this.updateAppointment(status).then(() => {
      this.reloadData.emit();
      this.toastController
        .create({
          message: 'Appointment succesfully update.',
          duration: 3000,
          position: 'top',
        })
        .then((toast) => toast.present());
    });
  }

  async updateAppointment(status: string) {
    const { id, ...fields } = this.appointment;
    const submitObject = Object.assign({}, fields, { status });
    try {
      await this.appointmentService.editAppointment(id, submitObject);
      console.log("edited ok")
    } catch (error) {
      console.log('An error occured', error);
    }
  }
  async updateAppointmentAlert(status: string) {
    const alert = await this.alertController.create({
      cssClass: 'confirm-alert',
      header: 'Alert!',
      message: 'Are you Sure?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Yes',
          handler: () => {
            this.updateAppointment(status).then(() => {
              this.toastController
                .create({
                  message: 'Appointment succesfully update.',
                  duration: 3000,
                  position: 'top',
                })
                .then((toast) => toast.present());
              this.reloadData.emit();
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async rescheduleAppointment() {
    const doctor = await this.doctorService.findDoctorById(this.appointment.doctorId);
    const clinicIndex = this.appointment?.clinicIndex || 0;
    const doctorInfo =
      doctor.doctors.filter((doctor) => {
        if (doctor.clinicIndex == clinicIndex) {
          return doctor;
        }
      })[0] || {};
    const modal = await this.modalController.create({
      component: AppointmentRescheduleComponent,
      componentProps: {
        doctorInfo,
        appointment: this.appointment,
      },
      presentingElement: await this.modalController.getTop(),
    });
    modal.onDidDismiss().then(() => {
      this.reloadData.emit();
    });

    await modal.present();
  }
}
