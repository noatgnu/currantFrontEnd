import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImputationQfeaturesComponent } from './imputation-qfeatures.component';

describe('ImputationQfeaturesComponent', () => {
  let component: ImputationQfeaturesComponent;
  let fixture: ComponentFixture<ImputationQfeaturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImputationQfeaturesComponent]
    });
    fixture = TestBed.createComponent(ImputationQfeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
