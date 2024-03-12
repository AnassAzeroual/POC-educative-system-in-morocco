import { TestBed } from '@angular/core/testing';

import { HistoriqueServiceService } from './historique-service.service';

describe('HistoriqueServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HistoriqueServiceService = TestBed.get(HistoriqueServiceService);
    expect(service).toBeTruthy();
  });
});
