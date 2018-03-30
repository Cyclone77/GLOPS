import { TestBed, inject } from '@angular/core/testing';

import { DemandServeService } from './demand-serve.service';

describe('DemandServeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DemandServeService]
    });
  });

  it('should be created', inject([DemandServeService], (service: DemandServeService) => {
    expect(service).toBeTruthy();
  }));
});
