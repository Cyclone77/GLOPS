import { TestBed, inject } from '@angular/core/testing';

import { GAjaxService } from './g-ajax.service';

describe('GAjaxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GAjaxService]
    });
  });

  it('should be created', inject([GAjaxService], (service: GAjaxService) => {
    expect(service).toBeTruthy();
  }));
});
