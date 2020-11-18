import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule ,FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { AssistantDetailsComponent } from './assistant-details/assistant-details.component';
import { AvailabilityComponent } from './availability/availability.component';
import { ClinicDetailsComponent } from './clinic-details/clinic-details.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { PractiseInfoComponent } from './practise-info/practise-info.component';
import { FeeStructureComponent } from './fee-structure/fee-structure.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
   ],
   declarations: [ProfilePage,
                 BasicInfoComponent,
                 AssistantDetailsComponent,
                 AvailabilityComponent,
                 ClinicDetailsComponent,
                 FeeStructureComponent,
                 PractiseInfoComponent,
                 TermsAndConditionsComponent]
})
export class ProfilePageModule {}
