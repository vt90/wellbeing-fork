import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesRoutingModule } from './services-routing.module';

import { ServicesPage } from './services.page';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesRoutingModule,
    SharedModule,
  ],
  exports: [ServicesPage],
  declarations: [ServicesPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: []
})
export class ServicesPageModule {}
