import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentPageRoutingModule } from './appointment-routing.module';

import { AppointmentPage } from './appointment.page';
import {CalendarModule} from 'ion2-calendar';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AppointmentPageRoutingModule,
        CalendarModule
    ],
  declarations: [AppointmentPage]
})
export class AppointmentPageModule {}
