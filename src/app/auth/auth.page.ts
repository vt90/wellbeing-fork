import {Component} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';
import {NgForm} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {BackendError, SuperadminBreak} from '../services/auth-backend';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {
  isLoading = false;
  isLogin = true;
  role = 'patient';
  private EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND';
  private EMAIL_NOT_FOUND2 = 'auth/user-not-found';
  private WRONG_PASSWORD = 'INVALID_PASSWORD';
  private WRONG_PASSWORD2 = 'auth/wrong-password';
  private PASSWORD_RESET = 'PASSWORD_RESET';
  private EMAIL_EXISTS = 'EMAIL_EXISTS';
  private EMAIL_EXISTS2 = 'auth/email-already-in-use';
  private USER_DISABLED = 'USER_DISABLED';
  private EMAIL_UNVERIFIED = 'EMAIL_UNVERIFIED';
  private LOGIN_AFTER_SIGNUP = 'LOGIN_AFTER_SIGNUP';
  private TOO_MANY_ATTEMPTS_TRY_LATER = 'TOO_MANY_ATTEMPTS_TRY_LATER';
  private TOO_MANY_ATTEMPTS_TRY_LATER2 = 'auth/too-many-requests';
  private USER_DEACTIVATED = 'USER_DEACTIVATED';
  private email: string;
  wrongPassword = false;

  constructor(private authService: AuthService,
              private router: Router,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private translate: TranslateService
  ) {
    console.log(this.translate.currentLang, this.translate.instant('AUTHERR.EmailNotFoundHeader'));
  }

  onLogin(loginForm: NgForm) {
    if (!loginForm.valid) {
      return;
    }
    const email = loginForm.value.email;
    const password = loginForm.value.pass;
    this.isLoading = true;
    this.email = email;

    this.loadingCtrl
      .create({keyboardClose: true, message: 'Logging in...'})
      .then(el => {
        el.present().then();
        this.authService.login(email, password).then((user) => {
          if (user.role === 'patient') {
            this.router.navigateByUrl('patient');
          }
          if (user.role === 'doctor' || user.role === 'assistant') {
            this.router.navigateByUrl('doctor');
          }
          this.loginSuccess(loginForm);
        })
          .catch(error => {
            if (error instanceof SuperadminBreak) {
              this.router.navigateByUrl('/admin').then();
              this.loginSuccess(loginForm);
            } else {
              this.showAlert(error).then();
            }
          });
        el.dismiss().then();
      });
  }

  private loginSuccess(loginForm: NgForm) {
    this.isLoading = false;
    loginForm.resetForm();
  }

  onRegister(loginform: NgForm) {
    if (!loginform.valid) {
      return;
    }
    const email = loginform.value.email;
    const password = loginform.value.pass;
    this.isLoading = true;
    this.email = email;
    let loadingElement: HTMLIonLoadingElement;

    this.loadingCtrl
      .create({keyboardClose: true, message: 'Register...'})
      .then(el => {
        loadingElement = el;
        return el.present();
      }).then(() => {
      // this fails by design, we want the user to validate the mail and log in again
      if (this.role === 'doctor' || this.role === 'assistant') {
        return this.authService.signupDoctor(email, password);
      } else if (this.role === 'patient') {
        return this.authService.signupPatient(email, password);
      }
    }).then()
      .catch(error => {
        return this.showAlert(error);
      }).then(errortype => {
      if (errortype === 0) {
        this.isLogin = true;
      }
      return loadingElement.dismiss();
    }).then();
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  private showAlert(error) {
    console.log(error, typeof error);
    let errorMessage: string;
    let email: string;
    let tenant: string;
    if (error instanceof HttpErrorResponse) {
      if (error.error !== null) {
        errorMessage = error.error.error.message;
      } else {
        console.log(error.status);
        errorMessage = error.status.toString();
      }
    } else if (error instanceof BackendError) {
      errorMessage = error.error.error;
      email = error.error.email;
      tenant = error.error.tenant;
    }
    this.isLoading = false;
    let header: string;
    let message: string;
    let errorType = 0;
    let resetpw = false;
    if (errorMessage === this.EMAIL_NOT_FOUND || errorMessage === this.EMAIL_NOT_FOUND2) {
      header = this.translate.instant('AUTHERR.EmailNotFoundHeader');
      message = this.translate.instant('AUTHERR.EmailNotFoundMsg');
    } else if (errorMessage === this.WRONG_PASSWORD || errorMessage === this.WRONG_PASSWORD2) {
      header = this.translate.instant('AUTHERR.WrongPwHeader');
      message = this.translate.instant('AUTHERR.WrongPwMsg');
      resetpw = true;
      this.wrongPassword = true;
    } else if (errorMessage === this.USER_DISABLED) {
      header = this.translate.instant('AUTHERR.UserDisabledHeader');
      message = this.translate.instant('AUTHERR.UserDisabledMsg');
    } else if (errorMessage === this.EMAIL_EXISTS || errorMessage === this.EMAIL_EXISTS2) {
      header = this.translate.instant('AUTHERR.EmailExistsHeader');
      message = this.translate.instant('AUTHERR.EmailExistsMsg');
      errorType = 1;
      resetpw = true;
    } else if (errorMessage === this.LOGIN_AFTER_SIGNUP) {
      header = this.translate.instant('AUTHERR.LoginAfterSignupHeader');
      message = this.translate.instant('AUTHERR.LoginAfterSignupMsg');
    } else if (errorMessage === this.EMAIL_UNVERIFIED) {
      header = this.translate.instant('AUTHERR.EmailUnverifiedHeader');
      message = this.translate.instant('AUTHERR.EmailUnverifiedMsg');
      resetpw = true;
    } else if (errorMessage === this.TOO_MANY_ATTEMPTS_TRY_LATER || errorMessage === this.TOO_MANY_ATTEMPTS_TRY_LATER2) {
      header = this.translate.instant('AUTHERR.TooManyAttemptsHeader');
      message = this.translate.instant('AUTHERR.TooManyAttemptsMsg');
    } else if (errorMessage === this.USER_DEACTIVATED) {
      header = this.translate.instant('AUTHERR.UserDeactivatedHeader');
      message = this.translate.instant('AUTHERR.UserDeactivatedMsg') + tenant;
    } else if (errorMessage === this.PASSWORD_RESET) {
      header = this.translate.instant('AUTHERR.PasswordResetHeader');
      message = this.translate.instant('AUTHERR.PasswordResetMsg') + email;
    } else {
      header = this.translate.instant('AUTHERR.OtherHeader') + errorMessage;
      message = this.translate.instant('AUTHERR.OtherMsg');
    }
    const buttons = [];
    buttons.push({text: 'OK', role: 'cancel'});
    if (resetpw) {
      buttons.push({
        text: this.translate.instant('AUTH.PWRESET'), cssClass: 'btnalert', handler: () => {
          this.authService.passwordReset(this.email);
          this.showAlert(new BackendError('Password Reset', {email: this.email, error: 'PASSWORD_RESET'})).then();
        }
      });
    }
    return this.alertCtrl.create({
      header,
      message,
      buttons
    }).then(alertEl => {
      return alertEl.present();
    }).then(() => {
      return errorType;
    });
  }

  onChangeRole(event) {
    this.role = event.value;
  }

  resetPassword(email: string) {
    this.authService.passwordReset(email);
  }
}
