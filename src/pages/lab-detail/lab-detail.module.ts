import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LabDetailPage } from './lab-detail';

@NgModule({
  declarations: [
    LabDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(LabDetailPage),
  ],
})
export class LabDetailPageModule {}
