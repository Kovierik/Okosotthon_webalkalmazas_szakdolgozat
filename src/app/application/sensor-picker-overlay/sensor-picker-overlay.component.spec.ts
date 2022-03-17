import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorPickerOverlayComponent } from './sensor-picker-overlay.component';

describe('SensorPickerOverlayComponent', () => {
  let component: SensorPickerOverlayComponent;
  let fixture: ComponentFixture<SensorPickerOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorPickerOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorPickerOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
