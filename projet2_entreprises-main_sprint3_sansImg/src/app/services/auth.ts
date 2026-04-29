import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../modele/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class Auth {
  apiURL: string = 'http://localhost:8081/users';
  token!: string;
  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];
  public registredUser: User = new User();

  private helper = new JwtHelperService();

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  login(user: User) {
    return this.http.post<User>(this.apiURL + '/login', user, { observe: 'response' });
  }

  saveToken(jwt: string) {
    const cleanToken = jwt.startsWith('Bearer ') ? jwt.substring(7) : jwt;
    localStorage.setItem('jwt', cleanToken);
    this.token = cleanToken;
    this.isloggedIn = true;
    this.decodeJWT();
  }

  decodeJWT() {
    if (!this.token) return;
    const decoded = this.helper.decodeToken(this.token);
    this.roles = decoded?.roles;
    this.loggedUser = decoded?.sub;
  }

  // ✅ FIX: also sets isloggedIn = true so AppComponent can check it after reload
  loadToken() {
    const stored = localStorage.getItem('jwt');
    if (stored) {
      this.token = stored;
      this.isloggedIn = true;
      this.decodeJWT();
    }
  }

  getToken(): string {
    return this.token;
  }

  isTokenExpired(): Boolean {
    if (!this.token) return true;
    return this.helper.isTokenExpired(this.token);
  }

  isAdmin(): Boolean {
    if (!this.roles) return false;
    return this.roles.indexOf('ADMIN') >= 0;
  }

  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  registerUser(user: User) {
    return this.http.post<User>(this.apiURL + '/register', user, { observe: 'response' });
  }

  setRegistredUser(user: User) {
    this.registredUser = user;
  }
  getRegistredUser(): User {
    return this.registredUser;
  }

  validateEmail(code: string) {
    return this.http.get<User>(this.apiURL + '/verifyEmail/' + code);
  }
}
