import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageServicesComponent } from './main-page-services.component';

describe('MainPageServicesComponent', () => {
  let component: MainPageServicesComponent;
  let fixture: ComponentFixture<MainPageServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPageServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
