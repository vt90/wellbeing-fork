import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {LangselectComponent} from '../langselect/langselect.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    exports: [
      LangselectComponent
    ],
    declarations: [LangselectComponent]
})
export class HomePageModule {}
