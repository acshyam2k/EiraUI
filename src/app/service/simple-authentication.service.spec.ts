import { TestBed } from '@angular/core/testing';

import { SimpleAuthenticationService } from './simple-authentication.service';

describe('SimpleAuthenticationService', () => {
  let service: SimpleAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
