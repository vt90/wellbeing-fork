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
    const id = form.value.emailId;
    const date = form.value.date;
    const timeSlot = form.value.time;
    const clinic = form.value.clinic;
    const type = form.value.type;

    console.log(id+" "+date+" "+timeSlot);
    console.log(clinic+" "+type);
    const appointment = {
      dateTime: date+timeSlot,
      patientId: id,
      confirmed: "no",
      clinic: clinic,
      type: type
    };

    this.appointmentService.add(appointment);
  }

  onDismiss() {
    this.modalCtrl.dismiss();
  }

}
