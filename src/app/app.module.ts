import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireFunctionsModule, REGION} from '@angular/fire/functions';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {I18nModule} from './i18n/i18n.module';
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {PatientModule} from './patient/patient.module';
import {DoctorModule} from './doctor/doctor.module';
import {environment} from '../environments/environment';
import {IonicStorageModule} from '@ionic/storage';

export function jwtOptionsFactory(storage: Storage) {
  return {
    tokenGetter: () => {
      return storage.get('access_token');
    },
    whitelistedDomains: ['googleapis.com', 'firebaseio.com']
  };
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    PatientModule,
    DoctorModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
    AngularFireAuthModule,
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
      }
    }),
    I18nModule
  ],

  providers: [
    StatusBar,
    SplashScreen,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    { provide: REGION, useValue: 'asia-south1'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
