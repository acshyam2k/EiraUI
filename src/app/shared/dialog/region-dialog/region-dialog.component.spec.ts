import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionDialogComponent } from './region-dialog.component';

describe('RegionDialogComponent', () => {
  let component: RegionDialogComponent;
  let fixture: ComponentFixture<RegionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
