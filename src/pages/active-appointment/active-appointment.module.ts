import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActiveAppointmentPage } from './active-appointment';

@NgModule({
  declarations: [
    ActiveAppointmentPage,
  ],
  imports: [
    IonicPageModule.forChild(ActiveAppointmentPage),
  ],
})
export class ActiveAppointmentPageModule {}
