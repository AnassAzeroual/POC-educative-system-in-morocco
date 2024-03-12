import { TestBed } from '@angular/core/testing';

import { BlocService } from '../blocService/bloc.service';

describe('BlocService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlocService = TestBed.get(BlocService);
    expect(service).toBeTruthy();
  });
});
