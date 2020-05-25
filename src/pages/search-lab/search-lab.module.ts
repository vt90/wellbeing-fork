import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchLabPage } from './search-lab';

@NgModule({
  declarations: [
    SearchLabPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchLabPage),
  ],
})
export class SearchLabPageModule {}
