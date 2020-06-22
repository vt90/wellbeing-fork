import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';

const routes: Routes = [
  {
    path: '', component: AuthPage,
    // path: 'doctor-register', redirectTo:'/doctor-register' ,pathMatch:'full',
  },
  {
    path: 'doctor-register', redirectTo:'/doctor-register' ,pathMatch:'full',
    loadChildren: () => import('../doctor-register/doctor-register.module').then( m => m.DoctorRegisterPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
