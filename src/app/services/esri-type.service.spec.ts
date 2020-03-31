import { TestBed } from '@angular/core/testing';

import { EsriTypeService } from './esri-type.service';

describe('EsriTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EsriTypeService = TestBed.get(EsriTypeService);
    expect(service).toBeTruthy();
  });
});
