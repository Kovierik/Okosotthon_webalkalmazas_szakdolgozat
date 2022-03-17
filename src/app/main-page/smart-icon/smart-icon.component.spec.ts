import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartIconComponent } from './smart-icon.component';

describe('SmartIconComponent', () => {
  let component: SmartIconComponent;
  let fixture: ComponentFixture<SmartIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
