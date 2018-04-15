import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {

  currentUrl;
  username;
  email;
  foundProfile = false;
  messageClass;
  message;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  getJSONFromData(data) {
    return JSON.parse(JSON.stringify(data));
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.authService.getPublicProfile(this.currentUrl.username).subscribe(data => {
      var json = this.getJSONFromData(data);
      if(!json.success){
        this.messageClass = 'alert alert-danger';
        this.message = json.message;
      } else {
        this.foundProfile = true;
        this.username = json.user.username;
        this.email = json.user.email;
      }
    });
  }

}
