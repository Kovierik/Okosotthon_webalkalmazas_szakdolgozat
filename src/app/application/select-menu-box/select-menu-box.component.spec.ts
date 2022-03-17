import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMenuBoxComponent } from './select-menu-box.component';

describe('SelectMenuBoxComponent', () => {
  let component: SelectMenuBoxComponent;
  let fixture: ComponentFixture<SelectMenuBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectMenuBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMenuBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
