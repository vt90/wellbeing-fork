import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeaturesPageRoutingModule } from './features-routing.module';

import { FeaturesPage } from './features.page';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeaturesPageRoutingModule,
    SharedModule,
  ],
  exports: [FeaturesPage],
  declarations: [FeaturesPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: []
})
export class FeaturesPageModule {}
