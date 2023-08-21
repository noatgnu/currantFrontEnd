import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifferentialAnalysisQfeaturesComponent } from './differential-analysis-qfeatures.component';

describe('DifferentialAnalysisQfeaturesComponent', () => {
  let component: DifferentialAnalysisQfeaturesComponent;
  let fixture: ComponentFixture<DifferentialAnalysisQfeaturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DifferentialAnalysisQfeaturesComponent]
    });
    fixture = TestBed.createComponent(DifferentialAnalysisQfeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
