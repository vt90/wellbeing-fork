import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LabBookAppointmentPage } from './lab-book-appointment';

@NgModule({
  declarations: [
    LabBookAppointmentPage,
  ],
  imports: [
    IonicPageModule.forChild(LabBookAppointmentPage),
  ],
})
export class LabBookAppointmentPageModule {}
