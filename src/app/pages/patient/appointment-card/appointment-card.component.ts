import { Component, OnInit, Input } from '@angular/core';
import { AppointmentBook } from 'src/app/model/appointment-book.model';
import moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { AppointmentService } from '../../../services/patient/appointment.service';
import { AlertController } from '@ionic/angular';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-appointment-card',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.scss'],
})
export class AppointmentCardComponent implements OnInit {
  @Input() appointment: AppointmentBook;
  @Output() reloadData = new EventEmitter();
  status: string;
  years: number;
  day: string;
  time: string;
  constructor(
    public translate: TranslateService,
    private appointmentService: AppointmentService,
    public alertController: AlertController
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
  }

  async updateAppointment(status: string) {
    const { id, ...fields } = this.appointment;
    const submitObject = Object.assign({}, fields, { status });
    try {
      await this.appointmentService.editAppointment(id, submitObject);
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
              this.reloadData.emit()
            });
          },
        },
      ],
    });

    await alert.present();
  }
}
