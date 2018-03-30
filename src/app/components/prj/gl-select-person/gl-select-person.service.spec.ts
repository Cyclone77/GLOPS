import { TestBed, inject } from '@angular/core/testing';

import { GlSelectPersonService } from './gl-select-person.service';

describe('GlSelectPersonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlSelectPersonService]
    });
  });

  it('should be created', inject([GlSelectPersonService], (service: GlSelectPersonService) => {
    expect(service).toBeTruthy();
  }));
});
