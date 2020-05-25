import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchDoctorPage } from './search-doctor';

@NgModule({
  declarations: [
    SearchDoctorPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchDoctorPage),
  ],
})
export class SearchDoctorPageModule {}
