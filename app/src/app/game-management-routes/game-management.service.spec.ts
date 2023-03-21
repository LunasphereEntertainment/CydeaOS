import { TestBed } from '@angular/core/testing';

import { GameManagementService } from './game-management.service';

describe('GameManagementServiceService', () => {
  let service: GameManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
