import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleAndConditionAssignmentComponent } from './sample-and-condition-assignment.component';

describe('SampleAndConditionAssignmentComponent', () => {
  let component: SampleAndConditionAssignmentComponent;
  let fixture: ComponentFixture<SampleAndConditionAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SampleAndConditionAssignmentComponent]
    });
    fixture = TestBed.createComponent(SampleAndConditionAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
