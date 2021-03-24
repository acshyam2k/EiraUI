import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardisedErrorCodeTableComponent } from './standardised-error-code-table.component';

describe('StandardisedErrorCodeTableComponent', () => {
  let component: StandardisedErrorCodeTableComponent;
  let fixture: ComponentFixture<StandardisedErrorCodeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardisedErrorCodeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardisedErrorCodeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
