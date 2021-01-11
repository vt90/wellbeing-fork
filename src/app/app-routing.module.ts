import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {redirectUnauthorizedTo, canActivate, customClaims} from '@angular/fire/auth-guard';
import {pipe} from 'rxjs';
import {map} from 'rxjs/operators';

export const redirectUnauthorizedToLogin = () => {
  return redirectUnauthorizedTo(['/', 'auth']);
};

export const doctorOnly = () => {
  return pipe(customClaims, map(claims => {
    return ( !!claims && (claims.hasOwnProperty('doctor') || claims.hasOwnProperty('assistant')) ) ? true : ['auth'];
  }));
};

export const patientOnly = () => {
  return pipe(customClaims, map(claims => {
    return ( !!claims && claims.hasOwnProperty('patient') ) ? true : ['auth'];
  }));
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'patient',
    loadChildren: () => import('./patient/patient.module').then(m => m.PatientPageModule),
    ...canActivate(patientOnly)
  },
  {
    path: 'doctor',
    loadChildren: () => import('./doctor/doctor.module').then(m => m.DoctorPageModule),
    ...canActivate(doctorOnly)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
