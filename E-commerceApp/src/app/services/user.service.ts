import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser, IUserCredentials, IUserRegister } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _baseUrl = 'http://localhost:3000/api';

  public get baseUrl() {
    return this._baseUrl;
  }
  public set baseUrl(value) {
    this._baseUrl = value;
  }
  private user: BehaviorSubject<IUser | null >;

  constructor(private http: HttpClient) {
    this.user = new BehaviorSubject<IUser | null >(null);
  }



  signIn(credentials: IUserCredentials): Observable<IUser> {
    return this.http
      .post<IUser>(`${this._baseUrl}/signin`, credentials)
      .pipe(map((user: IUser) => {
        this.user.next(user);
        //localStorage.setItem('userId', user._id.toString());
        return user;
      }));
  }


  register(user: IUserRegister): Observable<any> {
    return this.http.post(`${this._baseUrl}/register`, user);
  }

  signOut() {
    this.user.next(null);
  }

  getUserRole(): Observable<string[] | null> {
    return this.user.pipe(map(user => user ? [user.role] : null));
  }

  deleteUser(_id: string): Observable<void> {
    const url = `${this._baseUrl}/users/${_id}`;
    return this.http.delete<void>(url);
  }



  getClientUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this._baseUrl}/users/clients`);
  }

  setUser(user: IUser | null): void {
    this.user.next(user);
  }
  getUser(): Observable<IUser | null> {
    return this.user.asObservable();
  }


}
