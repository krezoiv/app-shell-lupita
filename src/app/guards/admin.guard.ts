import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
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
    private _router : Router
    
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
  
     if(this._authService.role === 'SUPER_ROLE'){
      return true;
     }else {
      this._router.navigateByUrl('/dashboard')
      return false
     }
  }

  
}
