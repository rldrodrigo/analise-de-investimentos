import { TestBed } from '@angular/core/testing';

import { TreasuryboundService } from './treasurybound.service';

describe('TreasuryboundService', () => {
  let service: TreasuryboundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreasuryboundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
