import {Component, Input} from '@angular/core';
import {RegnoVerificationService} from '../services/doctor/regno-verification.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.page.html',
  styleUrls: ['./doctor.page.scss'],
})
export class DoctorPage {
    rNo: string;

    constructor(private rNoService: RegnoVerificationService,
                private authService: AuthService,
                private router: Router) {
    }

    onValidate() {  // Written here for demo purpose
        this.rNoService.getDoctorDetails(this.rNo).subscribe(
            (response) => {
               console.log(response);
               JSON.stringify(response);
               },
            (err) => {console.log( 'No response' + err); },
        );
    }

    onLogout() {
        this.router.navigateByUrl('/auth');
        this.authService.logout();
    }
}
