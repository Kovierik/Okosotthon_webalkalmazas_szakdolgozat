import { TestBed } from '@angular/core/testing';

import { SensorPickerService } from './sensor-picker.service';

describe('SensorPickerService', () => {
  let service: SensorPickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensorPickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
