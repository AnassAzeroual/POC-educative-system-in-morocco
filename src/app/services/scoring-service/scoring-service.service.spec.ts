import { TestBed } from '@angular/core/testing';

import { ScoringServiceService } from './scoring-service.service';

describe('ScoringServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScoringServiceService = TestBed.get(ScoringServiceService);
    expect(service).toBeTruthy();
  });
});
