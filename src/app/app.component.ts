import { Component } from '@angular/core';
import {WebService} from "./web.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WebsocketService} from "./websocket.service";
import {Subscription} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TaskService} from "./task.service";
import {CoralService} from "./coral.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Coral';

  constructor(public ws: WebsocketService, private sb: MatSnackBar, private task: TaskService, private web: WebService, private coral: CoralService) {
    this.connectWebsocket()
    this.task.newTaskStarted.asObservable().subscribe((data: boolean) => {
      if (data && !this.ws.eventStreamConnected) {
        this.connectWebsocket()
      }
    })
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
          for (const f of res.output_files) {
            this.coral.coral.addFile(f)
          }

          for (let i = 0; i < this.coral.coral.operations.length; i++) {
            if (this.coral.coral.operations[i].id === id) {
              this.coral.coral.operations[i] = res
              break
            }
          }
          this.task.taskMap[id].statusSub.next("Completed")
        })
      }
    })
  }
}
