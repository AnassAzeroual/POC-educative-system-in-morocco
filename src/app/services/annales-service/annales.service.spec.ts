import { TestBed } from '@angular/core/testing';

import { AnnalesService } from './annales.service';

describe('AnnalesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnnalesService = TestBed.get(AnnalesService);
    expect(service).toBeTruthy();
  });
});
