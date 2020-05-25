import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocRegisterPatientPage } from './doc-register-patient';

@NgModule({
  declarations: [
    DocRegisterPatientPage,
  ],
  imports: [
    IonicPageModule.forChild(DocRegisterPatientPage),
  ],
})
export class DocRegisterPatientPageModule {}
