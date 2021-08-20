import {Component, Input} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AuthService} from './services/auth.service';
import {AuthUser} from './model/auth-user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  user: AuthUser;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
    console.log('inside AppComponent constructor');
  }

  watchUser() {
    this.authService
      .observeUser()
      .subscribe((user) => {
      this.user = user;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.watchUser();
    });
  }

  authenticate() {
    if (!!this.user){
      this.authService.logout();
      this.user = null;
    }
    else {
      this.router.navigateByUrl('/auth');
    }
  }



}
