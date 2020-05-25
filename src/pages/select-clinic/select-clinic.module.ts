import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectClinicPage } from './select-clinic';

@NgModule({
  declarations: [
    SelectClinicPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectClinicPage),
  ],
})
export class SelectClinicPageModule {}
