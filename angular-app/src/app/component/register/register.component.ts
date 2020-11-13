import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  confirmPassword: string;
  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.userService.register(this.username, this.password)
      .subscribe(res => {
        this.router.navigateByUrl('');
      });
  }

}
