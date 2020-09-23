import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddAppointmentComponent} from './appointment/add-appointment/add-appointment.component';
import {DoctorPage} from './doctor.page';

const routes: Routes = [
    {
        path: '',
        component: DoctorPage
    },
    {
        path: 'appointment',
        loadChildren: () => import('./appointment/appointment.module').then( m => m.AppointmentPageModule)
    },
    {
        path: 'add-appointment',
        component: AddAppointmentComponent,
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
