import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthServiceService } from './auth-service.service'

@Injectable()
export class AuthguardGuard implements CanActivate {
  constructor(public auth: AuthServiceService, public router: Router) {}
  canActivate(): boolean{
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      console.log("user not auth ");
      return false;
    }
    return true;
  }
}
