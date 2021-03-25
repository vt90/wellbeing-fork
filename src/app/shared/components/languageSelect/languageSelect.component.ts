import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-langselect',
  templateUrl: './languageSelect.component.html',
  styleUrls: ['./languageSelect.component.scss'],
})
export class LanguageSelectComponent implements OnInit {

  constructor(public translate: TranslateService) { }

  ngOnInit() {}

}
