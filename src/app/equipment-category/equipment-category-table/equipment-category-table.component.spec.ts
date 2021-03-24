import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentCategoryTableComponent } from './equipment-category-table.component';

describe('EquipmentCategoryTableComponent', () => {
  let component: EquipmentCategoryTableComponent;
  let fixture: ComponentFixture<EquipmentCategoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentCategoryTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentCategoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
