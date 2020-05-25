import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorAppointmentScheduledPage } from './doctor-appointment-scheduled';

@NgModule({
  declarations: [
    DoctorAppointmentScheduledPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorAppointmentScheduledPage),
  ],
})
export class DoctorAppointmentScheduledPageModule {}
