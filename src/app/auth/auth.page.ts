import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';
import {NgForm} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {BackendError} from './auth-backend';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;
  wrongPassword = false;
  wrongPasswordOnce = false;
  private role = 'patient';
  private EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND';
  private WRONG_PASSWORD = 'INVALID_PASSWORD';
  private EMAIL_EXISTS = 'EMAIL_EXISTS';
  private USER_DISABLED = 'USER_DISABLED';
  private EMAIL_UNVERIFIED = 'EMAIL_UNVERIFIED';
  private LOGIN_AFTER_SIGNUP = 'LOGIN_AFTER_SIGNUP';
  private ROLE_MISMATCH = 'ROLE_MISMATCH';
  private TOO_MANY_ATTEMPTS_TRY_LATER = 'TOO_MANY_ATTEMPTS_TRY_LATER';
  private PASSWORD_RESET = 'PASSWORD_RESET';

  constructor(private authService: AuthService,
              private router: Router,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController
              ) {
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
    this.isLoading = true;

    this.loadingCtrl
      .create({keyboardClose: true, message: 'logging in...'})
      .then(el => {
        el.present();
        if (this.isLogin) {
          this.authService.login(email, password, this.role).subscribe(() => {
            this.router.navigateByUrl('/home');
            this.isLoading = false;
            loginform.resetForm();
          }, (error) => { this.showAlert(error); });
        } else {
          this.authService.signup(email, password, this.role).subscribe(() => {
            },  // this fails by design, we want the user to validate the mail and log in again
            (error) => {
              this.showAlert(error);
            });
        }
        el.dismiss();
      });
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
    if(!this.isLogin && this.role=='doctor'){
      // this.router.navigateByUrl('/doctor-register');
      this.router.navigate(['/doctor-register'])
    }
  }

  private showAlert(error) {
    // console.log(error);
    let errorMessage: string;
    let email: string;
    if (error instanceof HttpErrorResponse) {
      errorMessage = error.error.error.message;
    } else if (error instanceof BackendError) {
      errorMessage = error.error.error;
      email = error.error.email;
    }
    this.isLoading = false;
    let header: string;
    let message: string;
    if (errorMessage === this.EMAIL_NOT_FOUND) {
      header = 'Email Not Found';
      message = 'Please correct or switch to Sign Up.';
    } else if (errorMessage === this.WRONG_PASSWORD) {
      header = 'Invalid Password';
      message = 'Please re-enter.';
      if (this.wrongPasswordOnce) {
        this.wrongPassword = true;
      } else {
        this.wrongPasswordOnce = true;
      }
    } else if (errorMessage === this.USER_DISABLED) {
      header = 'User Disabled';
      message = 'User account has been disabled by an administrator.';
    } else if (errorMessage === this.EMAIL_EXISTS) {
      header = 'User Exists';
      message = 'Cannot sign up, email already exists. Please log in or request forgotten password.';
    } else if (errorMessage === this.LOGIN_AFTER_SIGNUP) {
      header = 'Please Validate Email';
      message = 'Please click on the validation link in the email you just got and log in.';
    } else if (errorMessage === this.EMAIL_UNVERIFIED) {
      header = 'Email not verified';
      message = `Please click on the validation link in the email sent to ${email}.`;
    } else if (errorMessage === this.TOO_MANY_ATTEMPTS_TRY_LATER) {
      header = 'Unusual Activity';
      message = 'We have blocked all requests from this device due to unusual activity. Try again later.';
    } else if (errorMessage === this.PASSWORD_RESET) {
      header = 'Password reset mail sent.';
      message = 'Please check your mail to reset your password.';
    } else if (errorMessage === this.ROLE_MISMATCH) {
      header = 'Role not available';
      const available = error.error.roles.join(' ');
      message = `No such role: ${error.error.requested}. Available roles: ${available} `;
    } else {
      header = errorMessage;
      message = 'Please enter valid data.';
    }
    this.alertCtrl.create({
      header,
      message,
      buttons: [{text: 'OK', role: 'cancel'}]
    }).then(alertEl => {
      alertEl.present();
    });
  }
  onChangeRole(event) {
    this.role = event.value;
  }

  resetPassword(email: string) {
    console.log(email);
    this.authService.passwordReset(email).subscribe ( () => {} , error => {
      this.showAlert(error);
      this.wrongPassword = false;
      this.wrongPasswordOnce = false;
    });
  }
}
