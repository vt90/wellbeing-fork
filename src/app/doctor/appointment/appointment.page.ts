import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage {

  constructor( private modalCtrl: ModalController) { }


  filterChanged(event){

  }

  addNewAppointment(){
    this.modalCtrl.create({
      component: AddAppointmentComponent,
     }).then(modalElement => {
      modalElement.present();
      return modalElement.onDidDismiss();
    }).then(resultData => {
      console.log(resultData.data);
    });
  }
  
}
