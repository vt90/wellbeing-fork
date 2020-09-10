import { TestBed } from '@angular/core/testing';

import { RegnoVerificationService } from './regno-verification.service';

describe('RegnoverificationService', () => {
  let service: RegnoVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegnoVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
