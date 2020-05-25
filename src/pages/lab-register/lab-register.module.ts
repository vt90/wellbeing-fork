import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LabRegisterPage } from './lab-register';

@NgModule({
  declarations: [
    LabRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(LabRegisterPage),
  ],
})
export class LabRegisterPageModule {}
