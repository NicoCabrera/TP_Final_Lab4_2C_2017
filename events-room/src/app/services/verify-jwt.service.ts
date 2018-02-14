import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
@Injectable()
export class VerifyJwtService implements CanActivate{
  jwtHelper: JwtHelper = new JwtHelper();
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean>{
    if(tokenNotExpired()) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }

  constructor(private router: Router) { }

}
