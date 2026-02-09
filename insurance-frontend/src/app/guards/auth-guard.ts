import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const userRole = localStorage.getItem('role');
    const expectedRole = route.data['role'];

    // Not logged in
    if (!userRole) {
      this.router.navigate(['/']);
      return false;
    }

    // Role mismatch
    if (expectedRole && userRole !== expectedRole) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
