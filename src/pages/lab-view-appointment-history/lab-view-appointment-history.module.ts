import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LabViewAppointmentHistoryPage } from './lab-view-appointment-history';

@NgModule({
  declarations: [
    LabViewAppointmentHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(LabViewAppointmentHistoryPage),
  ],
})
export class LabViewAppointmentHistoryPageModule {}
