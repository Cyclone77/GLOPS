import { TestBed, inject } from '@angular/core/testing';

import { GlMsgService } from './gl-msg.service';

describe('GlMsgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlMsgService]
    });
  });

  it('should be created', inject([GlMsgService], (service: GlMsgService) => {
    expect(service).toBeTruthy();
  }));
});
