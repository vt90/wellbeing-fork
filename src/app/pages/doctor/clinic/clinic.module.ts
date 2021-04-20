import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ClinicPageRoutingModule} from './clinic-routing.module';

import {ClinicPage} from './clinic.page';
import {SharedModule} from '../../../shared/shared.module';
import {OnboardingPageModule} from "../onboarding/onboarding.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ClinicPageRoutingModule,
        SharedModule,
        OnboardingPageModule
    ],
    declarations: [ClinicPage],
    providers: [DatePipe]
})
export class ClinicPageModule {
}
