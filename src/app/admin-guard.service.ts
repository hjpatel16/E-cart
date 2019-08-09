import { Injectable } from '@angular/core';
import { AppUser } from './models/app-user';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router/router";
import { UserService } from "./user.service";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  fbUser: firebase.User;

  constructor(private authService: AuthService, private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.appUser$
      .map(appUser => appUser.isAdmin)
  }
}
