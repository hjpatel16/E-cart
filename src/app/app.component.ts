import { Component } from '@angular/core';
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { UserService } from "./user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
    authService.user$.subscribe(user => {
      if (user) {
        userService.save(user);   // no concept of registration in this application, we need to save user everytime they login so we have their updated information

        let returnUrl = localStorage.getItem('returnUrl');
        if(returnUrl){
          localStorage.removeItem('returnUrl');
          router.navigateByUrl(returnUrl);
        }
      }
    });
  }
}
