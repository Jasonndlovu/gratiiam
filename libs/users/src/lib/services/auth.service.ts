import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment.prod';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURLUsers = environment.apiURL + 'users';

  constructor(
    private http: HttpClient,
    private token: LocalstorageService,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiURLUsers}/login`, { email, password });
  }

  register(email: string, password: string, password_: string): Observable<User> {
    return this.http.post<User>(`${this.apiURLUsers}/register`, { email, password , password_  });
  }

  logout() {
    this.token.removeToken();
    this.router.navigate(['/login']);
  }

  logout2() {
    this.token.removeToken();
    this.router.navigate(['/A_Login']);
  }
}
