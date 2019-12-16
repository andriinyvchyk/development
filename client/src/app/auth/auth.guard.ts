import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    console.log(url)
    console.log(this.authService.loggedInStatus)
    this.authService.checkToken();
    if (this.authService.loggedInStatus === true) {
      return true; 
    }
    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;
    // this.authService.checkToken()
    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }

}
