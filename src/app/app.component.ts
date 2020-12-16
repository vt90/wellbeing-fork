import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  role: string;
  isPatient = false;
  isDoctor = false;
  isAssistant = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
    this.authService.user.subscribe(u => {
      if (u) {
        this.role = u.role;
        if (u.role === 'patient') {
          this.isPatient = true;
          this.isDoctor = false;
        } else if (u.role === 'doctor') {
          this.isDoctor = true;
          this.isPatient = false;
        } else if (u.role === 'assistant') {
          this.isAssistant = true;
          this.isDoctor = false;
          this.isPatient = false;
        }
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onLogout() {
    this.router.navigateByUrl('/home');
    this.authService.logout();
  }
}
