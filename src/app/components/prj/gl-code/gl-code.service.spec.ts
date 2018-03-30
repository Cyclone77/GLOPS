import { TestBed, inject } from '@angular/core/testing';

import { GlCodeService } from './gl-code.service';

describe('GlCodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlCodeService]
    });
  });

  it('should be created', inject([GlCodeService], (service: GlCodeService) => {
    expect(service).toBeTruthy();
  }));
});
