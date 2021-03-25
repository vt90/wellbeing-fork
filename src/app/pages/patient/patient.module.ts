import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PatientRoutingModule } from './patient-routing.module';
import {CommonModule} from '@angular/common';
import {PatientPage} from './patient.page';
import {PatientService} from '../../services/patient/patient.service';
import {SharedModule} from '../../shared/shared.module';
import {DoctorDetailsComponent} from './doctor-details/doctor-details.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    PatientRoutingModule,
    CommonModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule
  ],
  exports: [PatientPage],
  declarations: [PatientPage, DoctorDetailsComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [PatientService]
})
export class PatientPageModule {}
