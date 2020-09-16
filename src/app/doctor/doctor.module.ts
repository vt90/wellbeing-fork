import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {DoctorRoutingModule} from './doctor-routing.module';
import {AddAppointmentComponent} from './appointment/add-appointment/add-appointment.component';


@NgModule({
  declarations: [AddAppointmentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DoctorRoutingModule
  ],
})
export class DoctorModule {}
