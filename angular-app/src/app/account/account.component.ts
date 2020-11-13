import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Action, defaultPassword } from '../const';
import { EquipmentService } from '../service/equipment.service';
import { InternalTranslateService } from '../service/internal-translate.service';
import { UserService } from '../service/user.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  translateResults: any;
  title = 'Change password';
  equipment = {};
  isShowToast = false;
  role;
  formGroup: FormGroup;
  userSession;
  constructor(
    private equipmentService: EquipmentService,
    private iTranslateService: InternalTranslateService,
    private userService: UserService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private toastr: ToastrService
  ) {
    if (!this.userService.checkAuth()) {
      return;
    }

    this.translateResults = this.iTranslateService.translateResults;
  }

  ngOnInit(): void {
    this.userSession = this.userService.userSession;
    this.formGroup = new FormGroup({
      _id: new FormControl(this.userSession._id, {}),
      username: new FormControl(
        this.userSession.username,
        { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(30)] }
      ),
      current_password: new FormControl(
        '',
        { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(30)] }
      ),
      password: new FormControl(
        '',
        { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(30)] }),
      password_confirm: new FormControl(
        '',
        { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(30)] }),
    });
  }

  async editUser() {
    const user = this.formGroup.value;
    const id = this.userSession._id;
    const isValidPassword = await bcrypt.compare(this.formGroup.get('current_password').value, this.userSession.password);

    if (this.formGroup.status === 'VALID') {
      if (!isValidPassword) {
        this.toastr.error(this.translateResults.toast.invalid_current_password);
        return;
      }

      if (user.password !== user.password_confirm) {
        this.toastr.error(this.translateResults.toast.password_confirm_error);
        return;
      }
      this.userService.edit(id, user).subscribe(
        res => {
          this.userService.handleUnauthorized();
          this.toastr.success(this.translateResults.toast.change_password_successfully);
        },
        err => {
          this.toastr.error(err.error.message);
        }
      );
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  isDisplayError(key: string) {
    return this.formGroup.controls[key].touched && this.formGroup.controls[key].status === 'INVALID';
  }

}
