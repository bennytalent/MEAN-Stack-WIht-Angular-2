import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import 'rxjs/add/operator/map'
import { tokenNotExpired } from 'angular2-jwt'

@Injectable()
export class AuthService {

  domain = "http://localhost:8080";
  authToken;
  user;
  headers;

  constructor(
    private http: HttpClient,
  ) { }

  createAuthenticationHeaders() {
    this.loadToken();
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': this.authToken
    });

  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  registerUser(user) {
    return this.http.post(this.domain + '/authentication/register', user).map(res => res);
  }

  // Function to check if username is taken
  checkUsername(username) {
    return this.http.get(this.domain + '/authentication/checkUsername/' + username).map(res => res);
  }

  // Function to check if e-mail is taken
  checkEmail(email) {
    return this.http.get(this.domain + '/authentication/checkEmail/' + email).map(res => res);
  }

  login(user) {
    return this.http.post(this.domain + '/authentication/login', user).map(res => res);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/authentication/profile', {headers: this.headers}).map(res => res);
  }

  loggedIn(){
    return tokenNotExpired();
  }

}
