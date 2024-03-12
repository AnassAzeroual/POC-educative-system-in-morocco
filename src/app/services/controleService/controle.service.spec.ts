import { TestBed } from '@angular/core/testing';

import { ControleService } from './controle.service';

describe('ControleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ControleService = TestBed.get(ControleService);
    expect(service).toBeTruthy();
  });
});
