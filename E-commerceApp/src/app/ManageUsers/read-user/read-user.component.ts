import { Component, OnInit } from '@angular/core';
import { IUser } from '../../models/User';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-read-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './read-user.component.html',
  styleUrls: ['./read-user.component.css']
})
export class ReadUserComponent implements OnInit {
  clientUsers: IUser[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadClientUsers();
  }

  loadClientUsers(): void {
    this.userService.getClientUsers().subscribe({
      next: users => {
        this.clientUsers = users;
      },
      error: error => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    });
  }

  deleteUser(_id: string): void {
    this.userService.deleteUser(_id).subscribe({
      next: () => {
        this.loadClientUsers(); // Recharger la liste des clients après suppression
      },
      error: error => {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
      }
    });
  }

  

}
