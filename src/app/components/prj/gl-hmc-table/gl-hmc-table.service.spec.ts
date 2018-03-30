import { TestBed, inject } from '@angular/core/testing';

import { GLHmcTableService } from './gl-hmc-table.service';

describe('GLHmcTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GLHmcTableService]
    });
  });

  it('should be created', inject([GLHmcTableService], (service: GLHmcTableService) => {
    expect(service).toBeTruthy();
  }));
});
