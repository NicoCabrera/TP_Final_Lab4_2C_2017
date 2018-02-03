import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class VerifyJwtService implements CanActivate{

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean>{
    let rv = false;
    if(localStorage.getItem("token")){
      rv = true;
    }
    return rv;
  }

  constructor(private router: Router) { }

}
