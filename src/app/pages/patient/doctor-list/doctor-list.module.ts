import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {DoctorListRoutingModule} from './doctor-list-routing.module';

import {DoctorListComponent} from './doctor-list.component';
import {SharedModule} from '../../../shared/shared.module';
import {BookApointmentComponent} from './book-apointment/book-apointment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorListRoutingModule,
    SharedModule,
  ],
  exports: [DoctorListComponent, BookApointmentComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [DoctorListComponent, BookApointmentComponent]
})
export class DoctorListModule {
}
