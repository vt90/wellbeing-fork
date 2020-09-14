import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../auth/auth.guard';

const routes: Routes = [
    {
        path: 'appointment',
        loadChildren: () => import('./appointment/appointment.module').then( m => m.AppointmentPageModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'patients',
        loadChildren: () => import('./patients/patients.module').then( m => m.PatientsPageModule),
        canLoad: [AuthGuard]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
