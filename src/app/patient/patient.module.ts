import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PatientRoutingModule } from './patient-routing.module';
import {CommonModule} from '@angular/common';
import {PatientPage} from './patient.page';
import {PatientService} from '../services/patient/patient.service';
import {HomePageModule} from '../home/home.module';
import {DoctorDetailsComponent} from './doctor-details/doctor-details.component';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    PatientRoutingModule,
    CommonModule,
    HomePageModule
  ],
  exports: [PatientPage],
  declarations: [PatientPage, DoctorDetailsComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [PatientService]
})
export class PatientPageModule {}
