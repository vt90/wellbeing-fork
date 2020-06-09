import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';
import {NgForm} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user.model';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;
  private EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND';
  private WRONG_PASSWORD = 'INVALID_PASSWORD';
  private EMAIL_EXISTS = 'EMAIL_EXISTS';
  private USER_DISABLED = 'USER_DISABLED';
  private TOO_MANY_ATTEMPTS_TRY_LATER = 'TOO_MANY_ATTEMPTS_TRY_LATER';

  constructor(private authService: AuthService,
              private router: Router,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }

  ngOnInit() {
  }

  onLogin() {
  }

  onSubmit(loginform: NgForm) {
    if (!loginform.valid) {
      return;
    }
    const email = loginform.value.email;
    const password = loginform.value.pass;
    let authMethod: Observable<User>;
    this.isLoading = true;

    this.loadingCtrl
      .create({keyboardClose: true, message: 'logging in...'})
      .then(el => {
        el.present();
        if (this.isLogin) {
          authMethod = this.authService.login(email, password);
        } else {
          authMethod = this.authService.signup(email, password);
        }
        authMethod.subscribe(() => {
            this.router.navigateByUrl('/home');
            this.isLoading = false;
            loginform.resetForm();
          },
          (error: HttpErrorResponse) => {
            this.isLoading = false;
            console.log(error);
            this.showAlert(error);
          }
        );
        el.dismiss();
      });
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  private showAlert(error: HttpErrorResponse) {
    const errorMessage = error.error.error.message;
    let header: string;
    let message: string;
    if (errorMessage === this.EMAIL_NOT_FOUND) {
      header = 'Email Not Found';
      message = 'Please correct or switch to Sign Up.'
    } else if (errorMessage === this.WRONG_PASSWORD) {
      header = 'Invalid Password';
      message = 'Please re-enter.'
    } else if (errorMessage === this.USER_DISABLED) {
      header = 'User Disabled';
      message = 'User account has been disabled by an administrator.'
    } else if (errorMessage === this.EMAIL_EXISTS) {
      header = 'User Exists';
      message = 'Cannot sign up, email already exists. Please log in or request forgotten password.'
    } else if (errorMessage === this.TOO_MANY_ATTEMPTS_TRY_LATER) {
      header = 'Unusual Activity';
      message = 'We have blocked all requests from this device due to unusual activity. Try again later.'
    } else {
      header = errorMessage;
      message = 'Please enter valid data.'
    }
    this.alertCtrl.create({
      header,
      message,
      buttons: [{text: 'OK', role: 'cancel'}]
    }).then(alertEl => {
      alertEl.present();
    });
  }
}
