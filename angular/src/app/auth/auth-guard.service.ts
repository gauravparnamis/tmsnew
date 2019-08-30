import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()

export class AuthGuard implements CanActivate {
  constructor( private router: Router , private auth :AuthService) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['main/login']);
      return false;
    }
    return true;
  }
}