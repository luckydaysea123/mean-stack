import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  formGroup: FormGroup;
  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      username: new FormControl('', { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(30)] }),
      password: new FormControl('', { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(30)] })
    });
  }

  login() {
    if (this.formGroup.status === 'VALID') {
      this.userService.login(this.formGroup.get('username').value, this.formGroup.get('password').value)
        .subscribe(
          res => {
            const payload: any = jwt_decode(res.token);
            localStorage.setItem('token', res.token);
            this.userService.userSession = payload.user;
            this.router.navigateByUrl('equipment');
          },
          err => {
            this.toastr.error(err.error.message);
          }
        );
    } else {
      this.formGroup.markAllAsTouched();
    }

  }

  logout() {
    localStorage.removeItem('token');
  }

  isDisplayError(key: string) {
    return this.formGroup.controls[key].touched && this.formGroup.controls[key].status === 'INVALID';
  }
}
