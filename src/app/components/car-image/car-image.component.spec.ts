import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarImageComponent } from './car-image.component';

describe('CarImageComponent', () => {
  let component: CarImageComponent;
  let fixture: ComponentFixture<CarImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarImageComponent]
    });
    fixture = TestBed.createComponent(CarImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
