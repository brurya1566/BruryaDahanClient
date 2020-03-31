import { TestBed } from '@angular/core/testing';

import { MalfunctionStatusService } from './malfunction-status.service';

describe('MalfunctionStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MalfunctionStatusService = TestBed.get(MalfunctionStatusService);
    expect(service).toBeTruthy();
  });
});
