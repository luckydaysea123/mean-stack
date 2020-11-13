import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InternalTranslateService } from './service/internal-translate.service';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MeanStack';
  flag = false;
  username: string;
  password: string;
  isDisplayNav = false;

  constructor(
    private iTranslateService: InternalTranslateService,
    private userService: UserService,
    private router: Router
  ) {
    iTranslateService.initTranslateResults().subscribe(res => {
      this.flag = true;
    });
  }

  login() {
    this.userService.login(this.username, this.password)
      .subscribe(res => {
        this.isDisplayNav = true;
        this.router.navigateByUrl('equipment');
      });
  }
}


