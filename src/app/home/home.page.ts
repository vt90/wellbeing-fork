import {Component} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userRole: string;

  constructor(private authService: AuthService) {
    this.authService.user.subscribe(u => {
      if (u) {
        this.userRole = u.role;
      }
    });
  }

}
