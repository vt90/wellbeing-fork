import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LabAddAppointmentScheduledPage } from './lab-add-appointment-scheduled';

@NgModule({
  declarations: [
    LabAddAppointmentScheduledPage,
  ],
  imports: [
    IonicPageModule.forChild(LabAddAppointmentScheduledPage),
  ],
})
export class LabAddAppointmentScheduledPageModule {}
