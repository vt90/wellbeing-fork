import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './auth/auth.guard';
import {AuthPage} from './auth/auth.page';
import {DoctorRoutingModule} from './doctor/doctor-routing.module';
import {PatientRoutingModule} from './patient/patient-routing.module';
import {DoctorPage} from './doctor/doctor.page';
import {PatientPage} from './patient/patient.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'auth',
    component: AuthPage,
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'doctor',
    component: DoctorPage,
    loadChildren: () => import('./doctor/doctor.module').then( m => m.DoctorModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'patient',
    component: PatientPage,
    loadChildren: () => import('./patient/patient.module').then( m => m.PatientModule),
    canLoad: [AuthGuard]
  },
];

@NgModule({
  imports: [
    DoctorRoutingModule,
    PatientRoutingModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
