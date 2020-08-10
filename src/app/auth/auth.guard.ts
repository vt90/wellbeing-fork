import {Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {switchMap, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.userIsAuthenticated
      .pipe(
        take(1),
        switchMap(auth => {
          if (!auth) {
            return this.authService.autoLogin();
          } else {
            return of(auth);
          }
        }),
        tap(auth => {
          if (!auth) {
            this.router.navigateByUrl('/auth');
          }
        })
      );
  }
}
