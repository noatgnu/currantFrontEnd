import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskLogComponent } from './task-log.component';

describe('TaskLogComponent', () => {
  let component: TaskLogComponent;
  let fixture: ComponentFixture<TaskLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskLogComponent]
    });
    fixture = TestBed.createComponent(TaskLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
