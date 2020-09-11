import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientRoutingModule } from './patient-routing.module';

import { PatientPage } from './patient.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PatientRoutingModule
    ],
    exports: [
        PatientPage
    ],
    declarations: [PatientPage]
})
export class PatientModule {}
