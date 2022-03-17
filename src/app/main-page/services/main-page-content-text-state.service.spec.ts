import { TestBed } from '@angular/core/testing';

import { MainPageContentTextStateService } from './main-page-content-text-state.service';

describe('MainPageContentTextStateService', () => {
  let service: MainPageContentTextStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainPageContentTextStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
