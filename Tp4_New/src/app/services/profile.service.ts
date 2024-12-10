import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'http://localhost:3000/api/profile';

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}`, { withCredentials: true });
  }

  updateProfile(profileData: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.baseUrl}`, profileData, { withCredentials: true });
  }

  
}
