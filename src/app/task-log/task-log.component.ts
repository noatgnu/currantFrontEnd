import { Component } from '@angular/core';
import {WebsocketService} from "../websocket.service";
import {TaskService} from "../task.service";

@Component({
  selector: 'app-task-log',
  templateUrl: './task-log.component.html',
  styleUrls: ['./task-log.component.sass']
})
export class TaskLogComponent {
  constructor(public ws: WebsocketService, public task: TaskService) {
  }
}
