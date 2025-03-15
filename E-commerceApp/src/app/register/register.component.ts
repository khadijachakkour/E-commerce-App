import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserRegister} from '../models/User';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  standalone:true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [CommonModule,FormsModule]
})
export class RegisterComponent {

  userData: IUserRegister = {firstName: '', lastName: '', email: '', password: '' ,role:'client'};
  registerError = false;

  constructor(private http: HttpClient, private userService: UserService, private router: Router) {}

  // Méthode pour enregistrer un nouvel utilisateur
  registerUser(userData: IUserRegister): void {
    this.userService.register(userData).subscribe({
      next: () => {
        console.log('User registered successfully');
        this.router.navigate(['/signin']);
      },
      error: (error) => {
        console.error('Error registering user:', error);
        this.registerError = true;      }
    });
  }
}
