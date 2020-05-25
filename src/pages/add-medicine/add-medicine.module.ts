import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMedicinePage } from './add-medicine';

@NgModule({
  declarations: [
    AddMedicinePage,
  ],
  imports: [
    IonicPageModule.forChild(AddMedicinePage),
  ],
})
export class AddMedicinePageModule {}
