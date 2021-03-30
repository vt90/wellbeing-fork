import { AppointmentService } from '../../../../services/doctor/appointment.service';
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
    if (!form.valid){
      return;
    }
    const name = form.value.name;
    const date = this.timestamp(form.value.date);
    this.date(date);
    const timeSlot = this.timestamp(form.value.time);
    this.time(timeSlot);
    const clinic = form.value.clinic;
    const type = form.value.type;
    const birthDate = this.timestamp(form.value.dob);
    this.date(birthDate);

    /* console.log(name+" "+date+" "+timeSlot);
    console.log(clinic+" "+type+" "+birthDate); */

    const appointment = {
      date: date,
      time: timeSlot,
      name: name,
      confirmed: false,
      dateOfBirth: birthDate,
      clinic: clinic,
      type: type
    };

    //this.appointmentService.add(appointment);
  }

  onDismiss() {
    this.modalCtrl.dismiss();
  }

  private timestamp(d: string){  //converts date to timestamp
    const date = new Date(d);
    return Date.UTC( date.getUTCFullYear(),date.getUTCMonth(),date.getUTCDay());
  }

  private date(ts:number){ //converts timestamp to date
    const d = new Date(ts);
   /*  var year = d.getUTCFullYear();
    var month = ("0" + d.getUTCMonth()).slice(-2);
    var date = ("0" + d.getUTCDate()).slice(-2);
    console.log(month+"/"+date+"/"+year); */
    //return year+"/"+month+"/"+date;
    console.log(d);
    return d;
  }
  private time(ts:number){
    const d = new Date(ts);
    var hours = ("0" + d.getUTCHours()).slice(-2);
    var min = ("0" + d.getUTCMinutes()).slice(-2);
    console.log(hours+":"+min);
    return hours+":"+min;
  }

}
