import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrelationMatrixRComponent } from './correlation-matrix-r.component';

describe('CorrelationMatrixRComponent', () => {
  let component: CorrelationMatrixRComponent;
  let fixture: ComponentFixture<CorrelationMatrixRComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorrelationMatrixRComponent]
    });
    fixture = TestBed.createComponent(CorrelationMatrixRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
