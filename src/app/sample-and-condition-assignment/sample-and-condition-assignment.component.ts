import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-sample-and-condition-assignment',
  templateUrl: './sample-and-condition-assignment.component.html',
  styleUrls: ['./sample-and-condition-assignment.component.sass']
})
export class SampleAndConditionAssignmentComponent {
  @Input() samples: string[] = []
  @Input() sampleMap: any = {}
  @Output() sampleMapChange: EventEmitter<any> = new EventEmitter<any>()

  constructor() { }

  updateSampleMap(event: any) {
    this.sampleMapChange.emit(event)
  }
}
