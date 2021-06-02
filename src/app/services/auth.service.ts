/*
  Authentication service.
  Author: Peter Kunszt
 */

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
import {AuthUser} from '../model/auth-user.model';
import {AuthBackend} from './auth-backend';
import {Storage} from '@ionic/storage';
import {SuperadminBreak} from './auth-exceptions';

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
  private _user = new BehaviorSubject<AuthUser>(null);
  private _backend: AuthBackend;

  constructor(private auth: AngularFireAuth,
              private adb: AngularFireDatabase,
              private router: Router,
              private storage: Storage) {
    this._backend = new AuthBackend(auth, adb);
    this._backend.user.subscribe(u => {
      // this is called also on refresh by AngularFireAuth.
      // if the user is not null, we need to get the rest of the data from local storage.
      this._fbuser.next(u);
      if (!!u) {
        AuthUser.fromDB(u).then(usr => {
          this._user.next(usr);
        });
      } else {
        this.router.navigateByUrl('/auth').then();
      }
    });
  }

  /**
   * Return the current User object
   */
  get user(): AuthUser {
    return this._user.getValue();
  }

  get userIsAuthenticated() {
    return this._fbuser.getValue() !== null;
  }

  /*get isSuperAdmin(): boolean {
    return this._user.getValue() ? this._user.getValue().isSuperadmin : false;
  }*/

  get userID(): string {
    return this._user.getValue().id;
  }

  get token(): string {
    // @ts-ignore
    return this._user.getValue().getIdToken(true);
  }

  get emailId(): string{
    return  this._user.getValue().email;
  }

  async login(email: string, password: string): Promise<AuthUser> {
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

  signupAssistant(email: string, password: string) {
    return this._backend.signupAssistant(email, password);
  }

  logout(): void {
    this._backend.logout();
    this.storage.remove(AuthService.StorageString).then();

    // cancel listeners in other services here!
  }

  public setUser(newUser: AuthUser): void {
    this._user.next(newUser);
  }

  passwordReset(email: string) {
    return this._backend.passwordReset(email);
  }

  changePassword(email: string, newPwd: string){
    return this._backend.changePassword(email, newPwd);
  }

  observeUser() {
    return this._user.asObservable();
  }
}

