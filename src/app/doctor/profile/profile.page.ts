import {Component} from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  step = 0;

  constructor() {
  }

  continue() {
    // todo: navigate to next page
    console.log('done, next');
  }
}
