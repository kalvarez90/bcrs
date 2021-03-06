/*
============================================
; Title: role.guard.ts
; Author: Professor Krasso
; Date: 29 April 2021
; Modified By: Arlix Sorto
; Description: Role Guard
;===========================================
*/
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { RoleService } from '../services/role.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private cookiesService: CookieService, private roleService: RoleService){}

  //Determine if the user is admin otherwise navigate other users to home page.
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      //find user role from database
    return this.roleService.findUserRole(this.cookiesService.get('sessionuser')).pipe(map(res=>{
      console.log(res);
      //Check if user is admin
      if(res['data'].role === 'admin'){
        return true;
      }
      //Otherwise navigate other user to home page.
      else{
        this.router.navigate(['/']);
        return false;
      }
    }));

  }

}
