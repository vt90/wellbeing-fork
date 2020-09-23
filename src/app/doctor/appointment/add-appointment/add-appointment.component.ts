import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss'],
})
export class AddAppointmentComponent {

  constructor() { }

  bookAppointment(form: NgForm){
    if(!form.valid){
      return
    }
    const id = form.value.emailId;
    const date = form.value.date;
    const timeSlot = form.value.time;
    console.log(id+" "+date+" "+timeSlot);

  }


}
