import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewPrescriptionPage } from './view-prescription';

@NgModule({
  declarations: [
    ViewPrescriptionPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewPrescriptionPage),
  ],
})
export class ViewPrescriptionPageModule {}
