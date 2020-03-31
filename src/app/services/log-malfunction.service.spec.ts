import { TestBed } from '@angular/core/testing';

import { LogMalfunctionService } from './log-malfunction.service';

describe('LogMalfunctionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogMalfunctionService = TestBed.get(LogMalfunctionService);
    expect(service).toBeTruthy();
  });
});
