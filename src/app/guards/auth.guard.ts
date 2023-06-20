import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}
  async canActivate(): Promise<boolean> {
    // const isLoggedIn = await this.auth.isloggedin().toPromise();
    const isLoggedIn = true

    if (isLoggedIn) {
      // Custom logic to check if the user is logged in
      console.log("inside if", isLoggedIn);
      return true;  // Allow access to the route
    } else {
      // Redirect the user to the login page or any other desired route
      console.log("inside else", isLoggedIn)
      this.router.navigate(['/login']);
      return false; // Deny access to the route
    }
  }

}