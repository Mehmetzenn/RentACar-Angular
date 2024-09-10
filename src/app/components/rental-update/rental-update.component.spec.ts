import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalUpdateComponent } from './rental-update.component';

describe('RentalUpdateComponent', () => {
  let component: RentalUpdateComponent;
  let fixture: ComponentFixture<RentalUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentalUpdateComponent]
    });
    fixture = TestBed.createComponent(RentalUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
