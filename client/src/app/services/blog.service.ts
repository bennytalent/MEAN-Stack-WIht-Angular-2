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

  getSingleBlog(id) {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'blogs/singleBlog/' + id, {headers: this.headers}).map(res => res);
  }

  editBlog(blog) {
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + 'blogs/updateBlog/', blog, {headers: this.headers}).map(res => res);
  }

  deleteBlog(id){
    this.createAuthenticationHeaders();
    return this.http.delete(this.domain + 'blogs/deleteBlog/' + id, {headers: this.headers}).map(res => res);
  }

  likeBlog(id){
    this.createAuthenticationHeaders();
    const blogData = { id: id };
    return this.http.put(this.domain + 'blogs/likeBlog/', blogData, {headers: this.headers}).map(res => res);
  }

  dislikeBlog(id){
    this.createAuthenticationHeaders();
    const blogData = { id: id };
    return this.http.put(this.domain + 'blogs/dislikeBlog/', blogData, {headers: this.headers}).map(res => res);
  }

}
