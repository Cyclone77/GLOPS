import { TestBed, inject } from '@angular/core/testing';

import { CodeInputService } from './code-input.service';

describe('CodeInputService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodeInputService]
    });
  });

  it('should be created', inject([CodeInputService], (service: CodeInputService) => {
    expect(service).toBeTruthy();
  }));
});
