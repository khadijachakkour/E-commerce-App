import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { IUser } from '../models/User';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProfileComponent implements OnInit {

  userProfile: IUser | null = null;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getUserProfile().subscribe(
      profile => {
        this.userProfile = profile;
      },
      error => {
        console.error("Erreur lors du chargement du profil utilisateur:", error);
      }
    );
  }

  updateProfile() {
    // Logique pour mettre à jour le profil utilisateur
  }
}
