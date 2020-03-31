import { TestBed } from '@angular/core/testing';

import { HirarchiaService } from './hirarchia.service';

describe('HirarchiaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HirarchiaService = TestBed.get(HirarchiaService);
    expect(service).toBeTruthy();
  });
});
