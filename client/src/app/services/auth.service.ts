import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http'
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {

  domain = "http://localhost:8080";
  authToken;
  user;

  constructor(
    private http: HttpClient,
  ) { }

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

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

}
