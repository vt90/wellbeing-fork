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
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'patient',
    loadChildren: () => import('./pages/patient/patient.module').then(m => m.PatientPageModule),
    ...canActivate(patientOnly)
  },
  {
    path: 'doctor',
    loadChildren: () => import('./pages/doctor/doctor.module').then(m => m.DoctorPageModule),
    ...canActivate(doctorOnly)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
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
