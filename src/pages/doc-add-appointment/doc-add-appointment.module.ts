import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocAddAppointmentPage } from './doc-add-appointment';

@NgModule({
  declarations: [
    DocAddAppointmentPage,
  ],
  imports: [
    IonicPageModule.forChild(DocAddAppointmentPage),
  ],
})
export class DocAddAppointmentPageModule {}
