import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {LanguageSelectComponent} from './components/languageSelect/languageSelect.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {GoogleMapsComponent} from './components/google-maps/google-maps.component';
import {SearchDoctorComponent} from './components/search-doctor/search-doctor.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';

import {AgmCoreModule} from '@agm/core';
import {DoctorsMapComponent} from './components/doctors-map/doctors-map.component';
import {RouterModule} from '@angular/router';

export const COMMON_COMPONENTS = [
  DoctorsMapComponent,
  LanguageSelectComponent,
  ToolbarComponent,
  GoogleMapsComponent,
  SearchDoctorComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCgh9AaIQ3TiHafarKAxUrRCNPJRaduXAI',
    }),
  ],
  // @ts-ignore
  exports: [
    ...COMMON_COMPONENTS,
    CommonModule,
    IonicModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCgh9AaIQ3TiHafarKAxUrRCNPJRaduXAI',
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ...COMMON_COMPONENTS,
    ToolbarComponent,
    DoctorsMapComponent,
  ]
})
export class SharedModule {
}
