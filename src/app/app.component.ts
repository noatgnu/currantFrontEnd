import { Component } from '@angular/core';
import {WebService} from "./web.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WebsocketService} from "./websocket.service";
import {Subscription} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TaskService} from "./task.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Coral';

  constructor(public ws: WebsocketService, private sb: MatSnackBar, private task: TaskService, private web: WebService) {
    this.connectWebsocket()
  }

  connectWebsocket() {
    this.ws.connect(`ws://${this.web.host}/ws/operation/${this.ws.sessionID}/2/`)?.asObservable().subscribe((msg: any) => {
      msg.time = new Date(msg.time)
      this.ws.messages = [msg].concat(this.ws.messages)
      this.sb.open(msg.message, "Close", {duration: 5000})
      const id = msg.operationId
      if (msg.message === "Running operation") {
        this.task.taskMap[id].status = "Running"
      }
      if (msg.message === "Completed operation") {
        this.web.getOperation(id).then((res: any) => {
          this.task.taskMap[id].value = res
          this.task.taskMap[id].status = "Completed"
          this.task.taskMap[id].statusSub.next("Completed")
        })
      }
    })
  }
}
