import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import Swal from 'sweetalert2';
import { Roles } from '../models/user.models';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  public roles : Roles[]=[];
  constructor(
    private _authService : AuthService,
    private _router : Router,
    private _userService : UsersService,
    
    
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      
     if(this._authService.usuario.roleId === 'SUPER_ROLE'){
      return true;
      
      console.log('ok')
     }else {
      this._router.navigateByUrl('/dashboard')
      Swal.fire({
        title: "Error",
        text: "Acceso denegado",
        timer:1000
      })
    
      return false
     }
  }

  
}
