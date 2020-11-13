import { Component, EventEmitter, Input, OnInit, Output, OnChanges, AfterViewInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EquipmentService } from 'src/app/service/equipment.service';
import { InternalTranslateService } from 'src/app/service/internal-translate.service';
import { Location } from '@angular/common';
import { Equipment } from 'src/app/model/equipment';
import { Action, Type, Status } from 'src/app/const';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class EquipmentActionComponent implements OnInit, OnChanges {
  types;
  statuses;
  translateResults: any;
  title = 'Create New';
  equipment = {};
  users = [];
  @Output() isF5Table: EventEmitter<boolean> = new EventEmitter();
  @Input() formGroup: FormGroup;
  @Input() formValue: any;
  @Input() action;

  constructor(
    private equipmentService: EquipmentService,
    private iTranslateService: InternalTranslateService,
    private userService: UserService,
    private cdRef: ChangeDetectorRef) {
    this.translateResults = this.iTranslateService.translateResults;
    this.types = Type;
    this.statuses = Status;
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
    // if (changes.formValue && !changes.formValue.firstChange) {
    //   this.formGroup.setValue(this.filterEquipment(changes.formValue.currentValue));
    // }
    if (changes && changes.action) {
      switch (changes.action.currentValue.kind) {
        case Action.view:
          this.formGroup.disable();
          this.title = this.translateResults.action_title.view;
          break;
        case Action.edit:
          this.formGroup.enable();
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
    this.formGroup.get('type').setValue('0');
    this.formGroup.get('status').setValue('0');
    this.formGroup.enable();
    this.title = this.translateResults.action_title.add;
    this.action.kind = Action.add;
  }

  createEquipment() {
    const equipmentValue = this.formGroup.value;
    if (this.formGroup.status === 'VALID') {
      this.equipmentService.addEquipment(equipmentValue).subscribe(res => {
        this.isF5Table.emit(true);
        this.resetForm();
      });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  editEquipment() {
    const equipmentValue = this.formGroup.value;
    const id = this.formGroup.controls._id.value;
    if (this.formGroup.status === 'VALID') {
      this.equipmentService.editEquipment(id, equipmentValue).subscribe(res => {
        this.isF5Table.emit(true);
        this.resetForm();
      });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  filterEquipment(e) {
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
}
