import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthPage} from './auth/auth.page';
import {DoctorRoutingModule} from './doctor/doctor-routing.module';
import {PatientRoutingModule} from './patient/patient-routing.module';
import {redirectUnauthorizedTo, canActivate} from '@angular/fire/auth-guard';
import {DoctorPage} from './doctor/doctor.page';
import {PatientPage} from './patient/patient.page';

export const redirectUnauthorizedToLogin = () => {
  return redirectUnauthorizedTo(['/', 'auth']);
};


const routes: Routes = [
  {path: '', redirectTo: 'patient', pathMatch: 'full'},
  {
    path: 'auth',
    component: AuthPage,
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'doctor',
    component: DoctorPage,
    loadChildren: () => import('./doctor/doctor.module').then( m => m.DoctorModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'patient',
    component: PatientPage,
    loadChildren: () => import('./patient/patient.module').then( m => m.PatientModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
];

@NgModule({
  imports: [
    DoctorRoutingModule,
    PatientRoutingModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
