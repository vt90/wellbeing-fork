import {Component, OnDestroy, OnInit} from '@angular/core';
import {RegnoVerificationService} from '../services/doctor/regno-verification.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.page.html',
  styleUrls: ['./doctor.page.scss'],
})
export class DoctorPage implements OnInit, OnDestroy {
  rNo: string;
  role: string;
  sub: Subscription;

  constructor(private rNoService: RegnoVerificationService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.sub = this.authService.user.subscribe(u => {
      if (u) {
        this.role = u.role;
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onValidate() {  // Written here for demo purpose
    this.rNoService.getDoctorDetails(this.rNo).subscribe(
      (response) => {
        console.log(response);
        JSON.stringify(response);
      },
      (err) => {
        console.log('No response' + err);
      },
    );
  }

  onLogout() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }
}
