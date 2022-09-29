import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SuperRoleGuard implements CanActivate {
  
  constructor(
    private _authService: AuthService,
    private _router : Router
    ){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
    
      if(this._authService.usuario.roleId !== 'SUPER_ROLE'){
        return true;
      }else {
        this._router.navigateByUrl('/dashboard')
        Swal.fire({
          icon: 'error',
          title: "Error",
          text: "Acceso denegado, no cuenta con permiso 555",
          timer:1500
        })
        return false;
      }
      
  }
  
}
