import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardisedErrorCodeComponent } from './standardised-error-code.component';

describe('StandardisedErrorCodeComponent', () => {
  let component: StandardisedErrorCodeComponent;
  let fixture: ComponentFixture<StandardisedErrorCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardisedErrorCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardisedErrorCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
