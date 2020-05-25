import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LabViewReportsPage } from './lab-view-reports';

@NgModule({
  declarations: [
    LabViewReportsPage,
  ],
  imports: [
    IonicPageModule.forChild(LabViewReportsPage),
  ],
})
export class LabViewReportsPageModule {}
