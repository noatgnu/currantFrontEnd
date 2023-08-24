import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalizationQfeaturesComponent } from './normalization-qfeatures.component';

describe('NormalizationQfeaturesComponent', () => {
  let component: NormalizationQfeaturesComponent;
  let fixture: ComponentFixture<NormalizationQfeaturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NormalizationQfeaturesComponent]
    });
    fixture = TestBed.createComponent(NormalizationQfeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
