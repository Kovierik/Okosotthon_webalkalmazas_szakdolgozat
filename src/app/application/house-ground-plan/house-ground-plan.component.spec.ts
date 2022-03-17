import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseGroundPlanComponent } from './house-ground-plan.component';

describe('HouseGroundPlanComponent', () => {
  let component: HouseGroundPlanComponent;
  let fixture: ComponentFixture<HouseGroundPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseGroundPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseGroundPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
