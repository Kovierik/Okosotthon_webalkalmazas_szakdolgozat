import { TestBed } from '@angular/core/testing';

import { DeviceConnectionService } from './device-connection.service';

describe('DeviceConnectionService', () => {
  let service: DeviceConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
