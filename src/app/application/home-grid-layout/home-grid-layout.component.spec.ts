import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGridLayoutComponent } from './home-grid-layout.component';

describe('HomeGridLayoutComponent', () => {
  let component: HomeGridLayoutComponent;
  let fixture: ComponentFixture<HomeGridLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeGridLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGridLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
