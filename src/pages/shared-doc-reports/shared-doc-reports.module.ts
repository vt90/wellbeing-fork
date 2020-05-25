import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedDocReportsPage } from './shared-doc-reports';

@NgModule({
  declarations: [
    SharedDocReportsPage,
  ],
  imports: [
    IonicPageModule.forChild(SharedDocReportsPage),
  ],
})
export class SharedDocReportsPageModule {}
