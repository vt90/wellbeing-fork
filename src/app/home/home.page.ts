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
        this.getUserRole();
    }

    getUserRole() {
        if (this.authService.user.token != null) {
            this.userRole = this.authService.user.role;
            console.log(this.authService.user);
            console.log(this.userRole);
        }
    }
}
