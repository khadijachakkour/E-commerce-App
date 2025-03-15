import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class clientGuard  {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.userService.getUserRole().pipe(
      map(roles => {
        if (roles && roles.includes('client')) {
          return true;
        } else {
          // Rediriger vers une page non autorisée si l'utilisateur n'est pas admin
          return this.router.parseUrl('/signin');
        }
      })
    );
  }
}
