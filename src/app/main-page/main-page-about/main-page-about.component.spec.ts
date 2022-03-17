import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageAboutComponent } from './main-page-about.component';

describe('MainPageAboutComponent', () => {
  let component: MainPageAboutComponent;
  let fixture: ComponentFixture<MainPageAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPageAboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
