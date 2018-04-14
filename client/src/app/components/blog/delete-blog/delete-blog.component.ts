import { Component, OnInit } from '@angular/core';
import { BlogService } from "../../../services/blog.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-delete-blog',
  templateUrl: './delete-blog.component.html',
  styleUrls: ['./delete-blog.component.css']
})
export class DeleteBlogComponent implements OnInit {

  message;
  messageClass;
  foundBlog = false;
  processing = false;
  blog;
  currentUrl;

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  deleteBlog() {
    this.processing = true;
    this.blogService.deleteBlog(this.currentUrl.id).subscribe(data => {
      var json = this.getJSONFromData(data);
      if(!json.success) {
        this.messageClass = 'alert alert-danger';
        this.message = json.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = json.message;
        setTimeout(() => {
          this.router.navigate(['/blog'])
        }, 2000);
      }
    });
  }

  getJSONFromData(data) {
    return JSON.parse(JSON.stringify(data));
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.blogService.getSingleBlog(this.currentUrl.id).subscribe(data => {
      var json = this.getJSONFromData(data);
      if(!json.success) {
        this.messageClass = 'alert alert-danger';
        this.message = json.message;
      } else {
        this.blog = {
          title: json.blog.title,
          body: json.blog.body,
          createdBy: json.blog.createdBy,
          createdAt: json.blog.createdAt
        };
        this.foundBlog = true;
      }
    });
  }

}
