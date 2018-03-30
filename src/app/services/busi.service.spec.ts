import { TestBed, inject } from '@angular/core/testing';

import { BusiService } from './busi.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusiService]
    });
  });

  it('should be created', inject([BusiService], (service: BusiService) => {
    expect(service).toBeTruthy();
  }));
});
