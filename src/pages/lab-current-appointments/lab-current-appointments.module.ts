import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LabCurrentAppointmentsPage } from './lab-current-appointments';

@NgModule({
  declarations: [
    LabCurrentAppointmentsPage,
  ],
  imports: [
    IonicPageModule.forChild(LabCurrentAppointmentsPage),
  ],
})
export class LabCurrentAppointmentsPageModule {}
