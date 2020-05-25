import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateAssistantPage } from './create-assistant';

@NgModule({
  declarations: [
    CreateAssistantPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateAssistantPage),
  ],
})
export class CreateAssistantPageModule {}
