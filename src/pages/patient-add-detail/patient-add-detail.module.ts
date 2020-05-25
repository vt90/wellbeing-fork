import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientAddDetailPage } from './patient-add-detail';

@NgModule({
  declarations: [
    PatientAddDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientAddDetailPage),
  ],
})
export class PatientAddDetailPageModule {}
