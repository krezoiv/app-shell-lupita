import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Roles } from '../models/user.models';
import { UsersService } from '../services/users.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  public roles : Roles[]=[];
  constructor(
    private userService : UsersService,
    
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
    console.log('adm')
      return (this.userService.role === 'Super Administrador') ? true : false
  }

  getRoles(){
    this.userService.getRoles()
    .subscribe(({roles}) => {
      this.roles = roles
    })
  }
  
}
