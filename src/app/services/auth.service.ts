/*
  Authentication service.
  Author: Peter Kunszt
 */

import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
import {User} from '../model/user.model';
import {FirebaseBackend} from './firebase-backend';
import {Storage} from '@ionic/storage';
import {SuperadminBreak} from './auth-backend';

/**
 * Authentication Service for the Ionic App.
 * Supports both firebase and nodeJS as backend implementations
 *
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static StorageString = 'WBuserData';

  private _fbuser = new BehaviorSubject<any>(null);
  private _user = new BehaviorSubject<User>(null);
  private _backend: FirebaseBackend;

  constructor(private auth: AngularFireAuth,
              private adb: AngularFireDatabase,
              private router: Router,
              private storage: Storage) {
    this._backend = new FirebaseBackend(auth, adb);
    this._backend.user.subscribe(u => {
      // this is called also on refresh by AngularFireAuth.
      // if the user is not null, we need to get the rest of the data from local storage.
      this._fbuser.next(u);
      if (!!u) {
        this.storage.get(AuthService.StorageString).then(data => {
          if (!!data) {
            this._user.next(User.fromDBAndStorage(u, data));
          }
        });
        // }
      } else {
        this.router.navigateByUrl('/auth').then();
      }
    });
  }

  /**
   * Return the current User object
   */
  get user(): Observable<User> {
    return this._user.asObservable();
  }

  get userIsAuthenticated() {
    return this._fbuser.getValue() !== null;
  }

  get isSuperAdmin(): boolean {
    return this._user.getValue() ? this._user.getValue().isSuperadmin : false;
  }

  get userID(): string {
    return this._user.getValue().id;
  }

  login(email: string, password: string): Promise<User> {
    return this._backend.login(email, password).then(u => {
      this.setUser(u);
      return u;
    })
      .catch(error => {
        if (error instanceof SuperadminBreak) {
          this.setUser(error.user);
        }
        throw error;
      });
  }

  signupPatient(email: string, password: string) {
    return this._backend.signupPatient(email, password);
  }

  signupDoctor(email: string, password: string) {
    return this._backend.signupDoctor(email, password);
  }

  logout(): void {
    this._backend.logout();
    this.storage.remove(AuthService.StorageString).then();

    // cancel listeners in other services here!
  }

  // store the data that is not part of authz
  public setUser(newUser: User): void {
    this._user.next(newUser);
    this.storage.set(AuthService.StorageString, newUser.toStorageString()).then();
  }

  passwordReset(email: string) {
    return this._backend.passwordReset(email);
  }

  signupAssistant(email: string) {
    return this._backend.signUpAssistant(email);
  }
}

