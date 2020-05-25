import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorLeavePage } from './doctor-leave';

@NgModule({
  declarations: [
    DoctorLeavePage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorLeavePage),
  ],
})
export class DoctorLeavePageModule {}
