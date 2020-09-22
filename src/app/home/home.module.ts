import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { DoctorPage } from '../doctor/doctor.page';
import {LangselectComponent} from '../langselect/langselect.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
    ],
    exports: [
        DoctorPage,
      LangselectComponent
    ],
    declarations: [HomePage, DoctorPage, LangselectComponent]
})
export class HomePageModule {}
