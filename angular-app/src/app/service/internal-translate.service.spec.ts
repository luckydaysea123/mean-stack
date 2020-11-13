import { TestBed } from '@angular/core/testing';

import { InternalTranslateService } from './internal-translate.service';

describe('InternalTranslateService', () => {
  let service: InternalTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternalTranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
