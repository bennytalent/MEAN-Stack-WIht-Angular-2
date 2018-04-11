import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthService } from "./auth.service";

@Injectable()
export class BlogService {

  headers;
  domain = this.authService.domain;

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  createAuthenticationHeaders() {
    this.authService.loadToken();
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': this.authService.authToken
    });

  }

  newBlog(blog){
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + 'blogs/newBlog', blog, {headers: this.headers}).map(res => res);
  }

  getAllBlogs() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'blogs/allBlogs', {headers: this.headers}).map(res => res);
  }

}
