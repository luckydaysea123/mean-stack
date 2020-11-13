import { Component, OnInit, EventEmitter, OnChanges, Input, Output, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Action, defaultPassword } from 'src/app/const';
import { EquipmentService } from 'src/app/service/equipment.service';
import { InternalTranslateService } from 'src/app/service/internal-translate.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit, OnChanges {
  translateResults: any;
  title = 'Create New';
  equipment = {};
  users = [];
  isShowToast = false;
  @Output() isF5Table: EventEmitter<boolean> = new EventEmitter();
  @Input() formGroup: FormGroup;
  @Input() formValue: any;
  @Input() action;
  constructor(
    private equipmentService: EquipmentService,
    private iTranslateService: InternalTranslateService,
    private userService: UserService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private toastr: ToastrService
  ) {
  
    this.translateResults = this.iTranslateService.translateResults;
    this.userService.getAll().subscribe(rs => {
      rs.forEach(u => {
        this.users.push({
          label: u.username,
          value: u._id
        });
      });
    });
  }

  ngOnInit(): void {
      this.action.kind = Action.add;
      this.title = this.translateResults.action_title.add;
      this.formValue = this.formGroup.value;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.action) {
      switch (changes.action.currentValue.kind) {
        case Action.view:
          this.formGroup.disable();
          this.title = this.translateResults.action_title.view;
          break;
        case Action.edit:
          this.formGroup.disable();
          this.title = this.translateResults.action_title.edit;
          break;
        case Action.add:
          this.resetForm();
          break;
      }
    }
  }

  resetForm() {
    this.formGroup.reset();
    this.formGroup.enable();
    this.title = this.translateResults.action_title.add;
    this.action.kind = Action.add;
  }

  createUser() {
    const userValue = this.formGroup.value;
    userValue.password = defaultPassword;
    if (this.formGroup.status === 'VALID') {
      this.userService.add(userValue)
        .subscribe(
          res => {
            this.isF5Table.emit(true);
            this.resetForm();
            this.toastr.success(this.translateResults.toast.register_user_successfully);
          },
          err => {
            this.toastr.error(err.error.message);
          });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  editUser() {
    const equipmentValue = this.formGroup.value;
    const id = this.formGroup.controls._id.value;
    if(equipmentValue.password !== equipmentValue.password_confirm){
      this.toastr.error(this.translateResults.toast.password_confirm_error);
      return;
    }
    if (this.formGroup.status === 'VALID') {
      this.userService.edit(id, equipmentValue).subscribe(
        res => {
        this.userService.handleUnauthorized();
        this.toastr.success(this.translateResults.toast.change_user_successfully);
      });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  isDisplayError(key: string) {
    return this.action.kind !== 'view'
      && this.formGroup.controls[key].touched
      && this.formGroup.controls[key].status === 'INVALID';
  }

  onClickStatus() {
    if (this.formGroup.get('status').value == '1') {
      this.formGroup.get('owner').setValidators([Validators.required]);
      this.cdRef.detectChanges();
    }
    if (this.formGroup.get('status').value == '0') {
      this.formGroup.get('owner').setValidators([]);
      this.formGroup.get('owner').setValue(null);
    }
  }

  isDisplayOwnerInput() {
    return this.formGroup.get('status').value == 1;
  }

  navigateEquipments() {
    this.router.navigateByUrl('equipment/user/' + this.formGroup.get('_id').value);
  }

  resetPassword() {
    const id = this.formGroup.get('_id').value;
    this.formGroup.get('password').setValue(defaultPassword);
    if (confirm(this.translateResults.dialog.reset_password_confirm)) {
      this.userService.edit(id, this.formGroup.value)
        .subscribe(rs => {
          this.toastr.success(this.translateResults.toast.reset_password_successfully);
        });
    }
  }


  closeToast() {
    this.isShowToast = false;
  }
}
