import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssistantPageRoutingModule } from './assistant-routing.module';

import { AssistantPage } from './assistant.page';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AssistantPageRoutingModule,
        SharedModule
    ],
  declarations: [AssistantPage]
})
export class AssistantPageModule {}
