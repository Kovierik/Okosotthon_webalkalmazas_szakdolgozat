import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphSecondWidgetComponent } from './graph-second-widget.component';

describe('GraphSecondWidgetComponent', () => {
  let component: GraphSecondWidgetComponent;
  let fixture: ComponentFixture<GraphSecondWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphSecondWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphSecondWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
