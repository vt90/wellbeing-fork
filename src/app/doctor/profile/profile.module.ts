import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule ,FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import {HomePageModule} from "../../home/home.module";



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        IonicModule,
        ProfilePageRoutingModule,
        HomePageModule,
    ],
   declarations: [ProfilePage]
})
export class ProfilePageModule {}
