import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {DoctorRoutingModule} from './doctor-routing.module';
import {AddAppointmentComponent} from './appointment/add-appointment/add-appointment.component';
import {DoctorPage} from './doctor.page';
import {DoctorService} from '../../services/doctor/doctor.service';
import {SharedModule} from '../../shared/shared.module';
import {CalendarModule} from 'ion2-calendar';


@NgModule({
  declarations: [AddAppointmentComponent, DoctorPage],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DoctorRoutingModule,
    SharedModule,
    CalendarModule,
  ],
  exports: [DoctorPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DoctorService]
})
export class DoctorPageModule {}
