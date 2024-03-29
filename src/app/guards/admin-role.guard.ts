import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import Swal from 'sweetalert2';
import { Roles } from '../models/user.models';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';


@Injectable({
  providedIn: 'root'
})

/***
 * ! class for admin role guards autentications
 */
export class AdminRoleGuard implements CanActivate {


  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _userService: UsersService,


  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this._authService.usuario.roleId !== 'ADMIN_ROLE') {
      return true;
    }

    else {
      this._router.navigateByUrl('/dashboard')
      Swal.fire({
        icon: 'error',
        title: "Error",
        text: "Acceso denegado, no cuenta con permiso",
        timer: 1500
      })

      return false;
    }
  }


}
