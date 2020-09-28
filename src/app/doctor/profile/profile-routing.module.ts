import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PractiseInfoComponent } from './practise-info/practise-info.component';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
