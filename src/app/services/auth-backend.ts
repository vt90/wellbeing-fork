import {BackendError} from './auth-exceptions';
import {Role, AuthUser} from '../model/auth-user.model';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export class AuthBackend {
  private db: firebase.database.Database;

  constructor(private auth: AngularFireAuth,
              private adb: AngularFireDatabase) {
    this.db = adb.database;
    this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then();
  }

  public get user(): Observable<firebase.User> {
    return this.auth.user;
  }

  /**
   * Login Sequence:
   *
   * 1. Do login via email (can be extended to google, facebook in the future)
   * 2. If the does not exist, the pw is wrong or user's mail is not verified yet, throw an error
   * 3. Depending on the user type, retrieve the detailed data for the user (Patient or Doctor or Assistant)
   * 4. Return the detailed information on success, error otherwise
   * 5. If this is a first-time login (some data does not exist yet), the user is marked as such
   *
   */
  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error);
        // this will actually give us most error handling. like wrong pw, etc
        throw new BackendError(error.message, {email, error: error.code});
      })
      .then(async userCred => {
        // do not continue if the email has not yet been verified.
        if (!userCred.user.emailVerified) {
          throw new BackendError('Email is not verified', {email, error: 'EMAIL_UNVERIFIED'});
        }

        return AuthUser.fromDB(userCred.user);
      });
  }

  /**
   * Signup sequence for PATIENT and DOCTOR using email/pw, later google fb possible:
   *
   * 1. Create a new user using email/pw (google/fb can come later)
   * 2. Send a verification mail.
   * 3. Then call the database endpoint to store the role of the user as well in the db
   * 4. At the end an error is thrown so that the user goes and verifies his email. Log in will not work without it.
   */

  signupPatient(email: string, password: string) {
    return this.signup(email, password, 'patient');
  }

  signupDoctor(email: string, password: string) {
    return this.signup(email, password, 'doctor');
  }

  signupAssistant(email: string, password: string) {
    return this.signup(email, password, 'assistant');
  }

  public passwordReset(email: string) {
    this.auth.sendPasswordResetEmail(email)
      .then(() => {
        console.log('reset mail sent for', email);
      })
      .catch(err => {
        console.log('error on pw reset', err);
      });
  }

  logout(): void {
    this.auth.signOut().then();
  }

  async changePassword(email: string, newPassword: string) {
    try {
      console.log('password reset notification sent for', email);
      return await firebase.auth().currentUser.updatePassword(newPassword);
    } catch (error) {
      console.log(error);
    }
  }

  private signup(email: string, password: string, role: Role) {
    let user: AuthUser;

    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(userCred => {
          return AuthUser.fromDB(userCred.user);
        }).then(u => {
          user = u;
          return this.auth.currentUser;
      })
      .then(u => {
        return u.sendEmailVerification();
      })
      .then(() => {
        return this.db.ref(`users/${user.id}`).set({ role });
      })
      .then(() => {
        throw new BackendError('Signup Initiated', {error: 'LOGIN_AFTER_SIGNUP', user});
      })
      .catch(err => {
        if (err instanceof BackendError) {
          throw err;
        } else {
          console.log(err);
          throw new BackendError('Error from firebase', {error: err.code});
        }
      });
  }
}
