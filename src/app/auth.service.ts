/*
  Authentication service.
  Author: Peter Kunszt
 */

import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {BehaviorSubject, from, Observable, throwError} from 'rxjs';
import {Plugins} from '@capacitor/core';
import {map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {User} from './auth/user.model';
import {AuthBackend} from './auth/auth-backend';
import {FirebaseBackend} from './auth/firebase-backend';

/**
 * Authentication Service for the Ionic App.
 * Supports both firebase and nodeJS as backend implementations
 *
 * @class AuthService
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private _user = new BehaviorSubject<User>(null);
  private _logoutTimer: any;
  private _backend: AuthBackend;

  /**
   * Get the user ID as an observable
   */
  get userId(): Observable<string> {
    return this._user.asObservable()
      .pipe(map(user => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      }));
  }

  /**
   * Return the current User object
   */
  get user(): User {
    return this._user.getValue();
  }

  /**
   * Get an observable on whether the user is authenticated
   */
  get userIsAuthenticated(): Observable<boolean> {
    return this._user.asObservable()
      .pipe(map(user => {
        return user !== null;
      }));
  }

  /**
   * Get the user's security token. This is needed in all backend calls
   */
  get token(): Observable<string> {
    return this._user.asObservable()
      .pipe(map(user => {
        if (user) {
          return user.token;
        } else {
          return null;
        }
      }));
  }

  /* Dependency injection: http client, router. Also set up the backend based on the environment config */
  /* This may change in the future to choose the backend based on client configuration. */
  constructor(private httpClient: HttpClient,
              private router: Router) {
    if (environment.firebase) {
      this._backend = new FirebaseBackend(httpClient)
    } else {
      // todo: implement NodeJS backend
      console.log('Not implemented: NodeJS Backend')
      throwError(new ReferenceError('NodeJS Backend not yet implemented'))
    }
  }

  ngOnDestroy() {
    // Only autologout needs to be cleaned up
    if (this._logoutTimer) {
      clearTimeout(this._logoutTimer);
    }
  }

  login(email: string, password: string): Observable<User> {
    return this._backend.login(email, password).pipe(tap(user => {
      this.setUser(user);
    }));
  }

  signup(email: string, password: string): Observable<User> {
    return this._backend.signup(email, password).pipe(tap(user => {
      this.setUser(user);
    }));
  }

  logout(): void {
    this._user.next(null);
    Plugins.Storage.remove({key: 'authData'});
    if (this._logoutTimer) {
      clearTimeout(this._logoutTimer);
    }
  }

  // Used in the auth.guard
  autoLogin(): Observable<boolean> {
    return from(Plugins.Storage.get({key: 'authData'})).pipe(
      map(storageString => {
        if (storageString && storageString.value) {
          const storageData = JSON.parse(storageString.value);
          const newUser = new User(
            storageData.id,
            storageData.refreshToken,
            storageData.token,
            new Date(storageData.tokenExpiration)
          );
          if (newUser.tokenDuration <= 0) {
            return null;
          }
          return newUser;
        }
      }),
      tap(user => {
        if (user) {
          this._user.next(user);
          this.autoLogout(user.tokenDuration);
        }
      }),
      map(user => {
        return !!user;
      }));
  }

  private autoLogout(nsec: number): void {
    if (this._logoutTimer) {
      clearTimeout(this._logoutTimer);
    }
    this._logoutTimer = setTimeout(() => {
      console.log('logging out');
      this.logout();
      this.router.navigateByUrl('/auth');
    }, nsec);
  }

  private setUser(newUser: User): void {
    this._user.next(newUser);
    Plugins.Storage.set({key: 'authData', value: newUser.toStorageString()});
    this.autoLogout(newUser.tokenDuration);
  }

}

