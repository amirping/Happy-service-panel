import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthServiceService } from './auth-service.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthguardGuard implements CanActivate {
  constructor(public auth: AuthServiceService, public router: Router) { }
  canActivate(): Promise<boolean> {
    var flag;
    return this.auth.isAuthenticated().then(res => {
      console.log(res)
      if (res == true) {
        console.log("finish checking => OK")
        return true
      }
      else {
        this.router.navigate(['login']);
        console.log("guard => user not auth ");
        return false;
      }
    })
      .catch(error => {
        console.log(error)
        return false;
      })
    //return flag
    // we should delete the old token , but let's keep it for knwo since he will have always ro back to login ;)
  }
}
