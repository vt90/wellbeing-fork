import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.userIsAuthenticated) {
      this.router.navigateByUrl('/auth').then();
    } else {
      // add logic here to go to patient or doctor home. the authservice should give also the role.
      // todo
      this.router.navigateByUrl('/home').then();
    }
    return this.authService.userIsAuthenticated;
  }
}
