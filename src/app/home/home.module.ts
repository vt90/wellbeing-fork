import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { DoctorPage } from '../doctor/doctor.page';
import {PatientPageModule} from '../patient/patient.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    PatientPageModule
  ],
  declarations: [HomePage, DoctorPage]
})
export class HomePageModule {}
