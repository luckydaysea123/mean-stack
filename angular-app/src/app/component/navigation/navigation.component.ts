import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  username;
  role;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.username = this.userService.userSession.username;
    this.role = this.userService.userSession.role;
  }

  signOut() {
    this.userService.handleUnauthorized();
  }

}
