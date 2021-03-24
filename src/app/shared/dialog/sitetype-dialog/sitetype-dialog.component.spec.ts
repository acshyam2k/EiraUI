import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitetypeDialogComponent } from './sitetype-dialog.component';

describe('SitetypeDialogComponent', () => {
  let component: SitetypeDialogComponent;
  let fixture: ComponentFixture<SitetypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitetypeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitetypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
