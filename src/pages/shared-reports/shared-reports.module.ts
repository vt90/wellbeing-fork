import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedReportsPage } from './shared-reports';

@NgModule({
  declarations: [
    SharedReportsPage,
  ],
  imports: [
    IonicPageModule.forChild(SharedReportsPage),
  ],
})
export class SharedReportsPageModule {}
