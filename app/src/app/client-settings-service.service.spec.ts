import { TestBed } from '@angular/core/testing';

import { ClientSettingsService } from './client-settings.service';

describe('ClientSettingsServiceService', () => {
  let service: ClientSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
