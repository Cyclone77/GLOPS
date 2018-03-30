import { TestBed, inject } from '@angular/core/testing';

import { GlSelectUnitService } from './gl-select-unit.service';

describe('GlSelectUnitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlSelectUnitService]
    });
  });

  it('should be created', inject([GlSelectUnitService], (service: GlSelectUnitService) => {
    expect(service).toBeTruthy();
  }));
});
