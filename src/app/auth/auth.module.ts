import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import {HomePageModule} from '../home/home.module';
import {PatientModule} from '../patient/patient.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AuthPageRoutingModule,
        HomePageModule,
        PatientModule
    ],
  declarations: [AuthPage]
})
export class AuthPageModule {}
