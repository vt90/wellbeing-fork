import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LanguageSelectComponent } from './components/languageSelect/languageSelect.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {GoogleMapsComponent} from './components/google-maps/google-maps.component';
import {SearchDoctorComponent} from './components/search-doctor/search-doctor.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';

export const COMMON_COMPONENTS = [
  LanguageSelectComponent,
  ToolbarComponent,
  GoogleMapsComponent,
  SearchDoctorComponent
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
  ],
    exports: [
        ...COMMON_COMPONENTS,
        CommonModule,
        IonicModule,
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        ...COMMON_COMPONENTS,
        ToolbarComponent
    ]
})
export class SharedModule {}
