import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Action, PageSize } from 'src/app/const';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users = [] as User[];
  translateResults: any;
  formGroup: FormGroup;
  action = { kind: '' };
  page;
  pageSize = 5;
  count = 0;
  pageItem = [];
  begin;
  end;
  PageSizeDropdown;
  role;
  id;

  constructor(private userService: UserService, private router: Router) {
    if (!this.userService.checkAuth()) {
      return;
    }
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('', {}),
      password: new FormControl('', {}),
      _id: new FormControl('', {}),
    });
    this.role = this.userService.userSession.role;
    if (this.role === 1) {
      this.getAll(this.userService.userSession._id);
    } else {
      this.getAll();
    }
    this.onClickPageItem(0);
    this.PageSizeDropdown = PageSize;
  }

  getAll(id?) {
    if (id) {
      this.userService.getByID(id).subscribe(res => {
        this.users[0] = this.filterEquipment(res);
      }),
        this.pagination();
    } else {
      this.userService.getAll().subscribe(res => {
        this.users = res.map(item => {
          return this.filterEquipment(item);
        });
        this.pagination();
      });
    }

  }

  pagination() {
    this.pageItem = [];
    for (let index = 0; index < Math.ceil(this.users.length / this.pageSize); index++) {
      this.pageItem.push(index);
    }
    if (!this.pageItem.includes(this.page) && this.page > 0) {
      this.onClickPageItem(this.page - 1);
    }
  }

  onView(item: User) {
    this.formGroup.patchValue(item);
    this.action = { kind: Action.view };
  }

  onEdit(item: User) {
    this.formGroup.patchValue(item);
    this.action = { kind: Action.edit };
  }

  onDelete(item: User) {
    if (confirm('Are you sure to delete?')) {
      this.userService.deleteByID(item._id)
        .subscribe(res => {
          if (this.formGroup && this.formGroup.get('_id').value === item._id) {
            this.action = { kind: Action.add };
          }
          this.getAll();
        });
    }
  }

  F5Table(isF5: boolean) {
    if (isF5) {
      this.getAll();
    }
  }

  filterEquipment(e: User) {
    return {
      username: e.username,
      // password: e.password,
      _id: e._id,
    } as User;
  }

  // getType(typeNumber: number) {
  //   if (typeNumber !== undefined) {
  //     return Type.filter(t => t.value === typeNumber)[0].label;
  //   }
  // }

  // getStatus(statusNumber: number) {
  //   if (statusNumber !== undefined && statusNumber !== null) {
  //     return Status.filter(stt => stt.value === statusNumber)[0].label;
  //   }
  // }

  onClickPageItem(page) {
    this.page = page;
    this.begin = page * (+this.pageSize);
    this.end = page * (+this.pageSize) + (+this.pageSize);
  }

  onClickPageSize() {
    this.getAll();
    this.onClickPageItem(0);
  }

  // getOwner(item: User) {
  //   // this.userService.getByID(item.i)
  // }

}
