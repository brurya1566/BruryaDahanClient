import { TestBed } from '@angular/core/testing';

import { MalfunctionService } from './malfunction.service';

describe('MalfunctionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MalfunctionService = TestBed.get(MalfunctionService);
    expect(service).toBeTruthy();
  });
});
