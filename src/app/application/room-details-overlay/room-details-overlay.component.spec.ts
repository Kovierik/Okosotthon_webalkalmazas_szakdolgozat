import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailsOverlayComponent } from './room-details-overlay.component';

describe('RoomDetailsOverlayComponent', () => {
  let component: RoomDetailsOverlayComponent;
  let fixture: ComponentFixture<RoomDetailsOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomDetailsOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
