import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
/***
 * ! class for  autentications on login to enter to the app
 */
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.authService.validateToken()
      .pipe(
        tap(isAuthenticated => {

          if (!isAuthenticated) {
            this.router.navigateByUrl('/');
          }
        }));
  }

}
//