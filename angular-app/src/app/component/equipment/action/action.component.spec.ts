import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentActionComponent } from './action.component';



describe('EquipmentActionComponent', () => {
  let component: EquipmentActionComponent;
  let fixture: ComponentFixture<EquipmentActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.EquipmentActionComponent(EquipmentActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
