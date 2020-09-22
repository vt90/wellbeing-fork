import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'appointment',
        loadChildren: () => import('./appointment/appointment.module').then( m => m.AppointmentPageModule)
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
    },
    {
        path: 'patients',
        loadChildren: () => import('./patients/patients.module').then( m => m.PatientsPageModule)
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
