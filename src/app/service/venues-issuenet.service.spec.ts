import { TestBed } from '@angular/core/testing';

import { VenuesIssuenetService } from './venues-issuenet.service';

describe('VenuesIssuenetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VenuesIssuenetService = TestBed.get(VenuesIssuenetService);
    expect(service).toBeTruthy();
  });
});
