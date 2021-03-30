import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddAppointmentComponent} from './appointment/add-appointment/add-appointment.component';
import {DoctorPage} from './doctor.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorPage
  },
  {
    path: 'appointment',
    loadChildren: () => import('./appointment/appointment.module').then(m => m.AppointmentPageModule)
  },
  {
    path: 'add-appointment',
    component: AddAppointmentComponent,
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./onboarding/onboarding.module').then(m => m.OnboardingPageModule)
  },
  {
    path: 'patients',
    loadChildren: () => import('./patients/patients.module').then(m => m.PatientsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'assistant',
    loadChildren: () => import('./assistant/assistant.module').then(m => m.AssistantPageModule)
  },
  {
    path: 'clinic',
    loadChildren: () => import('./clinic/clinic.module').then(m => m.ClinicPageModule)
  },
  {
    path: 'todo',
    loadChildren: () => import('./todo/todo.module').then(m => m.TodoPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {
}
