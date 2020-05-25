import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageClinicPage } from './manage-clinic';

@NgModule({
  declarations: [
    ManageClinicPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageClinicPage),
  ],
})
export class ManageClinicPageModule {}
