import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import {LangselectComponent} from '../langselect/langselect.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
    ],
    exports: [
      LangselectComponent
    ],
    declarations: [HomePage, LangselectComponent]
})
export class HomePageModule {}
