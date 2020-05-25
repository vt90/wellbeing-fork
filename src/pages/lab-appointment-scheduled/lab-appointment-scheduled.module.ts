import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LabAppointmentScheduledPage } from './lab-appointment-scheduled';

@NgModule({
  declarations: [
    LabAppointmentScheduledPage,
  ],
  imports: [
    IonicPageModule.forChild(LabAppointmentScheduledPage),
  ],
})
export class LabAppointmentScheduledPageModule {}
