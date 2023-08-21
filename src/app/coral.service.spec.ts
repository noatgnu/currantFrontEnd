import { TestBed } from '@angular/core/testing';

import { CoralService } from './coral.service';

describe('CoralService', () => {
  let service: CoralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
