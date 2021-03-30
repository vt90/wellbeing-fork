import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LanguageSelectComponent } from './components/languageSelect/languageSelect.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

export const COMMON_COMPONENTS = [
  LanguageSelectComponent,
  ToolbarComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    ...COMMON_COMPONENTS,
    CommonModule,
    IonicModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ...COMMON_COMPONENTS,
    ToolbarComponent,
  ]
})
export class SharedModule {}
