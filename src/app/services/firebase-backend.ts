import {BackendError, SuperadminBreak} from './auth-backend';
import {User} from '../model/user.model';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export class FirebaseBackend {
  private db: firebase.database.Database;

  constructor(private auth: AngularFireAuth,
              private adb: AngularFireDatabase) {
    this.db = adb.database;
    this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then();
  }

  public get user(): Observable<any> {
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
    let user: User;
    return this.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error);
        // this will actually give us most error handling. like wrong pw, etc
        throw new BackendError(error.message, {email, error: error.code});
      })
      .then(userCred => {
        user = User.fromDB(userCred.user);
        if (!user.emailVerified) {
          throw new BackendError('Email is not verified', {email, error: 'EMAIL_UNVERIFIED'});
        }
        return this.db.ref(`users/${user.id}`).once('value');
      })
      .then(dataSnap => {
        const dbUser = dataSnap.val();
        user.role = dbUser.hasOwnProperty('role') ? dbUser.role : '';
        if (user.role === 'assistant') {
          user.managerID = dbUser.hasOwnProperty('managerID') ? dbUser.mangerID : null;
          user.isActive = dbUser.hasOwnProperty('isActive') ? dbUser.isActive : null;
          if (!user.isActive) {
            throw new BackendError('User is not activated', {email: user.email, error: 'USER_DEACTIVATED', doctor: user.managerID});
          }
        }
        user.isSuperadmin = dbUser.hasOwnProperty('isSuperadmin') ? dbUser.isSuperadmin : false;
        if (user.isSuperadmin) {
          // only way to break out of the pipe stream: throw.
          console.log('isSuperadmin');
          throw new SuperadminBreak(user);
        }
        return user;
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

  private signup(email: string, password: string, role: string) {
    let user: User;
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(userCred => {
        user = User.fromDB(userCred.user);
        return this.auth.currentUser;
      })
      .then(u => {
        return u.sendEmailVerification();
      })
      .then(() => {
        return this.db.ref(`users/${user.id}`).set({role});
      })
      .then(() => {
        throw new BackendError('Signup Initiated', {error: 'LOGIN_AFTER_SIGNUP'});
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

  async signUpAssistant(email: string){
    let user: User;
    return this.auth.createUserWithEmailAndPassword(email, 'Abcdefg2')
        .then(userCred => {
          user = User.fromDB(userCred.user);
          return this.auth.currentUser;
        })
        .then(u => {
          return u.sendEmailVerification();
        })
        .then(() => {
          return this.db.ref(`users/${user.id}`).set({role: 'assistant'});
        })
        .then(() => {
          throw new BackendError('Signup Initiated', {error: 'LOGIN_AFTER_SIGNUP'});
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

  async changePassword(email: string, newPassword: string) {
    try {
       console.log('password reset notification sent for', email);
       return await firebase.auth().currentUser.updatePassword(newPassword);
    } catch (error) {
      console.log(error);
    }
  }
}
