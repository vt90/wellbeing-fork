import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientPage } from './patient.page';

const routes: Routes = [
  {
    path: '',
    component: PatientPage
  },
  {
    path: 'appointment',
    loadChildren: () => import('./appointment/appointment.module').then(m => m.AppointmentPageModule)
  },
  {
    path: 'todo',
    loadChildren: () => import('./todo/todo.module').then(m => m.TodoPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./onboarding/onboarding.module').then(m => m.OnboardingPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
