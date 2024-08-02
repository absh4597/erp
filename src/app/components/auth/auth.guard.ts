import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private router: Router) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  let token = localStorage.getItem('jwtToken');
  if (token && state.url != '/login') {
    return true;
  }
  else if (token && state.url == '/login') {
    this.router.navigate(['dashboard/default']);
    return false;
  }
  else if (!token && state.url != '/login') {
    this.router.navigate(['login']);
    return true;
  }
  return true;
}

}
