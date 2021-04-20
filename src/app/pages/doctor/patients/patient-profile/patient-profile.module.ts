import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientProfilePageRoutingModule } from './patient-profile-routing.module';

import { PatientProfilePage } from './patient-profile.page';
import {SharedModule} from "../../../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PatientProfilePageRoutingModule,
        SharedModule
    ],
  declarations: [PatientProfilePage]
})
export class PatientProfilePageModule {}
