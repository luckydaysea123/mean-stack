import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EquipmentService } from 'src/app/service/equipment.service';
import { TranslateService } from '@ngx-translate/core';
import { InternalTranslateService } from 'src/app/service/internal-translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipment } from 'src/app/model/equipment';
import { Action, Status, Type, PageSize } from 'src/app/const';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {

  role;
  title = 'Equipments List';
  equipments = [];
  type;
  status;
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
  flag = true;

  constructor(
    private equipmentService: EquipmentService,
    private iTranslateService: InternalTranslateService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    if (!this.userService.checkAuth()) {
      return;
    }
    this.translateResults = this.iTranslateService.translateResults;
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl('', { validators: [Validators.required] }),
      desc: new FormControl('', {}),
      type: new FormControl('0', { validators: [Validators.required] }),
      status: new FormControl('0', {}),
      owner: new FormControl(''),
      _id: new FormControl('', {}),
    });
    const userSession = this.userService.userSession;
    if (userSession.role === 1) {
      this.getAll(userSession._id);
      this.onClickPageItem(0);
      this.PageSizeDropdown = PageSize;
      this.flag = false;
      return;
    }
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) { this.flag = false; }
      this.getAll(id);
      this.onClickPageItem(0);
      this.PageSizeDropdown = PageSize;
    });
  }

  getAll(id?: string) {
    if (id) {
      this.equipmentService.getByOwner(id).subscribe(
        res => {
          this.equipments = res.map(item => {
            return this.filterEquipment(item);
          });
        },
        err => {
          this.toastr.error(err.error.message);
          if (err.status === 401) {
            this.userService.handleUnauthorized();
          }
        }
      );
    } else {
      this.equipmentService.getAll().subscribe(
        res => {
          this.equipments = res.map(item => {
            return this.filterEquipment(item);
          });
        },
        err => {
          this.toastr.error(err.error.message);
          if (err.status === 401) {
            this.userService.handleUnauthorized();
          }
        }
      );
    }
    this.pagination();
  }

  pagination() {
    this.pageItem = [];
    for (let index = 0; index < Math.ceil(this.equipments.length / this.pageSize); index++) {
      this.pageItem.push(index);
    }
    if (!this.pageItem.includes(this.page) && this.page > 0) {
      this.onClickPageItem(this.page - 1);
    }
  }

  onView(item: Equipment) {
    this.formGroup.patchValue(item);
    this.action = { kind: Action.view };
  }

  onEdit(item: Equipment) {
    this.formGroup.patchValue(item);
    this.action = { kind: Action.edit };
  }

  onDelete(item: Equipment) {
    if (confirm('Are you sure to delete?')) {
      this.equipmentService.deleteEquipment(item._id)
        .subscribe(
          res => {
            if (this.formGroup && this.formGroup.get('_id').value === item._id) {
              this.action = { kind: Action.add };
            }
            this.getAll();
          },
          err => {
            this.toastr.error(err.error.message);
            if (err.status === 401) {
              this.userService.handleUnauthorized();
            }
          }
        );
    }
  }

  F5Table(isF5: boolean) {
    if (isF5) {
      this.getAll();
    }
  }

  filterEquipment(e: Equipment) {
    return {
      name: e.name,
      type: e.type,
      status: e.status,
      desc: e.desc,
      _id: e._id,
      owner: !e.owner ? '' : e.owner,
      ownerName: e.ownerName
    } as Equipment;
  }

  getType(typeNumber: number) {
    if (typeNumber !== undefined) {
      return Type.filter(t => t.value === typeNumber)[0].label;
    }
  }

  getStatus(statusNumber: number) {
    if (statusNumber !== undefined && statusNumber !== null) {
      return Status.filter(stt => stt.value === statusNumber)[0].label;
    }
  }

  onClickPageItem(page) {
    this.page = page;
    this.begin = page * (+this.pageSize);
    this.end = page * (+this.pageSize) + (+this.pageSize);
  }

  onClickPageSize() {
    this.getAll();
    this.onClickPageItem(0);
  }

  getOwner(item: Equipment) {
    // this.userService.getByID(item.i)
  }
}
