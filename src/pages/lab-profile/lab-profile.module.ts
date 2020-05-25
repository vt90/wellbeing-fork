import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LabProfilePage } from './lab-profile';

@NgModule({
  declarations: [
    LabProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(LabProfilePage),
  ],
})
export class LabProfilePageModule {}
