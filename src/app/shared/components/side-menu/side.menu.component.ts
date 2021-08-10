import {Component, OnInit} from '@angular/core';
import {AuthUser} from '../../../model/auth-user.model';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {Doctor} from '../../../model/doctor.model';
import {DoctorService} from '../../../services/doctor/doctor.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side.menu.component.html',
  styleUrls: ['./side.menu.component.scss'],
})
export class SideMenuComponent implements OnInit {

  doctor: Doctor;

  user: AuthUser;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private doctorService: DoctorService,
  ) {

  }


  ngOnInit(): void {
    this.initializeApp();
  }

  watchUser() {
    this.authService
      .observeUser()
      .subscribe((user) => {
        this.user = user;

        this.setIsDoctor(user.id);
      });
  }

  setIsDoctor(userId) {
    this.doctor = null;
    this.doctorService.getDoctorOrAssistantById(userId).then(doctor => {
      this.doctor = doctor;
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
    if (!!this.user) {
      this.authService.logout();
      this.user = null;
    } else {
      this.router.navigateByUrl('/auth');
    }
  }

}
