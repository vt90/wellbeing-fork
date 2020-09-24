import { AppointmentService } from './../../../services/doctor/appointment.service';
import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss'],
})
export class AddAppointmentComponent {

  constructor(private modalCtrl: ModalController,
              private appointmentService: AppointmentService) { }

  bookAppointment(form: NgForm){
    if(!form.valid){
      return
    }
    const name = form.value.name;
    const date = this.timestamp(form.value.date);
    const timeSlot =this.timestamp(form.value.time);
    const clinic = form.value.clinic;
    const type = form.value.type;
    const birthDate = this.timestamp(form.value.dob);

    console.log(name+" "+date+" "+timeSlot);
    console.log(clinic+" "+type+" "+birthDate);

    const appointment = {
      date: date,
      time: timeSlot,
      name: name,
      confirmed: false,
      dateOfBirth: birthDate,
      clinic: clinic,
      type: type
    };

    this.appointmentService.add(appointment);
  }

  onDismiss() {
    this.modalCtrl.dismiss();
  }

  private timestamp(d: string){
    const date = new Date(d);
    return Date.UTC( date.getUTCFullYear(),date.getUTCMonth(),date.getUTCDay());
  }

}
