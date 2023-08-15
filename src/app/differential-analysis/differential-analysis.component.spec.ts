import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifferentialAnalysisComponent } from './differential-analysis.component';

describe('DifferentialAnalysisComponent', () => {
  let component: DifferentialAnalysisComponent;
  let fixture: ComponentFixture<DifferentialAnalysisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DifferentialAnalysisComponent]
    });
    fixture = TestBed.createComponent(DifferentialAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
