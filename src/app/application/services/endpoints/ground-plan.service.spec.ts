import { TestBed } from '@angular/core/testing';

import { GroundPlanService } from './ground-plan.service';

describe('GroundPlanService', () => {
  let service: GroundPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroundPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
