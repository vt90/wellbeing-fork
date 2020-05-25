import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocCurrentAppointmentsPage } from './doc-current-appointments';

@NgModule({
  declarations: [
    DocCurrentAppointmentsPage,
  ],
  imports: [
    IonicPageModule.forChild(DocCurrentAppointmentsPage),
  ],
})
export class DocCurrentAppointmentsPageModule {}
