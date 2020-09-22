import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-langselect',
  templateUrl: './langselect.component.html',
  styleUrls: ['./langselect.component.scss'],
})
export class LangselectComponent implements OnInit {

  constructor(public translate: TranslateService) { }

  ngOnInit() {}

}
