import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LabListPage } from './lab-list';

@NgModule({
  declarations: [
    LabListPage,
  ],
  imports: [
    IonicPageModule.forChild(LabListPage),
  ],
})
export class LabListPageModule {}
