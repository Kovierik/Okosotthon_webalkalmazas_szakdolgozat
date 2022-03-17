import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceManagerItemsComponent } from './device-manager-items.component';

describe('DeviceManagerItemsComponent', () => {
  let component: DeviceManagerItemsComponent;
  let fixture: ComponentFixture<DeviceManagerItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceManagerItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceManagerItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
