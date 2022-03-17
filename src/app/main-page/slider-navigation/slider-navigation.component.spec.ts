import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderNavigationComponent } from './slider-navigation.component';

describe('SliderNavigationComponent', () => {
  let component: SliderNavigationComponent;
  let fixture: ComponentFixture<SliderNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
