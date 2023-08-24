import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {WebService} from "../web.service";
import {WebsocketService} from "../websocket.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TaskService} from "../task.service";
import {CoralService} from "../coral.service";
import {Task} from "../class/task";

@Component({
  selector: 'app-correlation-matrix-r',
  templateUrl: './correlation-matrix-r.component.html',
  styleUrls: ['./correlation-matrix-r.component.sass']
})
export class CorrelationMatrixRComponent {
  @Output() operation: EventEmitter<any> = new EventEmitter<any>()
  columns: string[] = []
  selectedFileName: string = ""
  form: FormGroup = this.fb.group({
    sampleColumns: [[], Validators.required],
    indexColumn: [null, Validators.required],
    correlationMethod: ["pearson",],
    order: ["original",Validators.required],
    presentingMethod: ["ellipse",Validators.required],
    correlationPlotShape: ["upper", Validators.required],
    hclusteringMethod: ["ward.D",],
    minValue: [null,],
    maxValue: [null,],
  })
  correlationPlotShape: string[] = ["full", "lower", "upper"]
  presentingMethod: string[] = ["circle", "square", "ellipse", "number", "shade", "color", "pie"]
  correlationMethod: string[] = ["pearson", "spearman", "kendall"]
  orderList: string[] = ["original", "AOE", "FPC", "hclust", "alphabet"]
  hclusteringMethod: string[] = ["complete", "ward", "ward.D", "ward.D2", "single", "average",
    "mcquitty", "median", "centroid"]
  outputFiles: any[] = []

  sampleMap: any = {}
  wsSub: Subscription = new Subscription()

  sessionID: string = ""
  constructor(
      private web: WebService,
      private fb: FormBuilder,
      private ws: WebsocketService,
      private sb: MatSnackBar,
      private task: TaskService,
      public coral: CoralService
  ) {


  }
  countMap: any = {}

  submit() {
    const f: any = Object.assign({}, this.form.value)
    f["conditionMap"] = this.sampleMap
    const body: any = {
      inputFiles: [this.sessionID],
      form: f,
      operationType: "R-CORR",
      sessionId: this.ws.sessionID,
    }
    const task: Task = new Task(0, body["operationType"], "Created")
    this.task.tasks.push(task)
    this.outputFiles = []
    task.statusSub.asObservable().subscribe((status: any) => {
      if (status === "Completed") {
        this.outputFiles = task.value.output_files
      }
    })
    this.web.postParameters(body).then((res: any) => {
      task.id = res.id
      task.value = res
      this.task.taskMap[res.id.toString()] = task
      this.coral.coral.addOperation(res)
    })
  }
}
