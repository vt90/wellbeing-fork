import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClinicPageRoutingModule } from './clinic-routing.module';

import { ClinicPage } from './clinic.page';
import {HomePageModule} from "../../home/home.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ClinicPageRoutingModule,
        HomePageModule
    ],
  declarations: [ClinicPage]
})
export class ClinicPageModule {}
