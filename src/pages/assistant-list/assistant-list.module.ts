import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssistantListPage } from './assistant-list';

@NgModule({
  declarations: [
    AssistantListPage,
  ],
  imports: [
    IonicPageModule.forChild(AssistantListPage),
  ],
})
export class AssistantListPageModule {}
