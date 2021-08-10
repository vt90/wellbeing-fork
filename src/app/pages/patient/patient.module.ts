import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PatientRoutingModule } from './patient-routing.module';
import { CommonModule, DatePipe } from '@angular/common';
import { PatientPage } from './patient.page';
import { PatientService } from '../../services/patient/patient.service';
import { SharedModule } from '../../shared/shared.module';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { CalendarModule } from 'ion2-calendar';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    PatientRoutingModule,
    CommonModule,
    SharedModule,
    CalendarModule,
  ],
  exports: [PatientPage],
  declarations: [PatientPage, DoctorDetailsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [PatientService, DatePipe],
})
export class PatientPageModule {}
