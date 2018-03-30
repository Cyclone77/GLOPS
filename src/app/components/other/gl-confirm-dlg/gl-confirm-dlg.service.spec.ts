import { TestBed, inject } from '@angular/core/testing';

import { GlConfirmDlgService } from './gl-confirm-dlg.service';

describe('GlConfirmDlgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlConfirmDlgService]
    });
  });

  it('should be created', inject([GlConfirmDlgService], (service: GlConfirmDlgService) => {
    expect(service).toBeTruthy();
  }));
});
