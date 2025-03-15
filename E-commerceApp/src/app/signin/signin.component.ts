import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { IUserCredentials } from '../models/User';

@Component({
  selector: 'app-signin',
  standalone:true,
  templateUrl: './signin.component.html',
  imports: [CommonModule,FormsModule],
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  credentials: IUserCredentials = { email: '', password: '' };
  signInError: boolean = false;


  constructor(private userService: UserService, private router: Router) { }


  signIn() {
    this.signInError = false;
    this.userService.signIn(this.credentials).subscribe({
      next: (user) => {
        this.userService.setUser(user); // Stocker les informations de l'utilisateur
        // Redirection en fonction du rôle de l'utilisateur
        if (user.role === 'admin') {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: () => (this.signInError = true)
    });
  }
}
