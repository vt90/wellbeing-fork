import { Component } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.page.html',
  styleUrls: ['./patient.page.scss'],
})
export class PatientPage {

  constructor(private authService: AuthService,
              private router: Router) { }


  onLogout() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }
}
