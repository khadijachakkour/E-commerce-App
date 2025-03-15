import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { IUser } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  user: IUser | null = null;
  showSignOutMenu: boolean = false;
  showManageProductsOptions = false;


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    const user = this.userService.getUser();
    if (user) {
      user.subscribe({
        next: (user) => { this.user = user; }
      });
    }
  }

  toggleSignOutMenu() {
    this.showSignOutMenu = !this.showSignOutMenu;
  }

  signOut() {
    this.userService.signOut();
    this.showSignOutMenu = false;
    this.router.navigate(['/signin']);

  }

  toggleManageProducts() {
    this.showManageProductsOptions = !this.showManageProductsOptions;
  }

}
