import { TestBed } from '@angular/core/testing';

import { UrgencyService } from './urgency.service';

describe('UrgencyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UrgencyService = TestBed.get(UrgencyService);
    expect(service).toBeTruthy();
  });
});
