import { TestBed } from '@angular/core/testing';

import { LocalTypeService } from './local-type.service';

describe('LocalTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalTypeService = TestBed.get(LocalTypeService);
    expect(service).toBeTruthy();
  });
});
