import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuccessfulAppointmentPage } from './successful-appointment';

@NgModule({
  declarations: [
    SuccessfulAppointmentPage,
  ],
  imports: [
    IonicPageModule.forChild(SuccessfulAppointmentPage),
  ],
})
export class SuccessfulAppointmentPageModule {}
