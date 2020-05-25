import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorAddAppointmentScheduledPage } from './doctor-add-appointment-scheduled';

@NgModule({
  declarations: [
    DoctorAddAppointmentScheduledPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorAddAppointmentScheduledPage),
  ],
})
export class DoctorAddAppointmentScheduledPageModule {}
