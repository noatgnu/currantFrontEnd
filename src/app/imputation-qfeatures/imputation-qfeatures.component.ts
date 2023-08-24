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
  selector: 'app-imputation-qfeatures',
  templateUrl: './imputation-qfeatures.component.html',
  styleUrls: ['./imputation-qfeatures.component.sass']
})
export class ImputationQfeaturesComponent {
  @Output() operation: EventEmitter<any> = new EventEmitter<any>()
  columns: string[] = []
  selectedFileName: string = ""
  form: FormGroup = this.fb.group({
    imputation: ["knn", Validators.required],
    dataCompleteness: [1, Validators.required],
    sampleColumns: [[], Validators.required],
    indexColumn: [null, Validators.required],

  })

  outputFiles: any[] = []

  sampleMap: any = {}
  wsSub: Subscription = new Subscription()
  conditions: string[] = []
  imputation: string[] = ["neighbour_average", "knn", "mle", "mle2", "bpca", "mixed", "min", "MinDet", "MinProb", "QRILC", "zero", "RF"]
  diffTest: string[] = ["limma"]

  sessionID: string = ""
  constructor(
    private web: WebService,
    private fb: FormBuilder,
    private ws: WebsocketService,
    private sb: MatSnackBar,
    private task: TaskService,
    public coral: CoralService
  ) {
    this.form.controls["sampleColumns"].valueChanges.subscribe((data) => {
      console.log(data)
      this.updateConditions(data)
    })


  }
  countMap: any = {}
  updateConditions(data: string[]) {
    const sampleMap: any = {}
    data.forEach((a: string) => {
      const condition_replicate = a.split(".")
      const replicate = condition_replicate[condition_replicate.length-1]
      const condition = condition_replicate.slice(0, condition_replicate.length-1).join(".")
      sampleMap[a] = {condition, replicate}
    })
    this.sampleMap = sampleMap
    this.updateSummary(undefined, data)
  }

  updateSummary(event: any, sampleData: string[] = []) {
    const countMap: any = {}
    if (sampleData.length === 0) {
      sampleData = this.form.value.sampleColumns
    }
    for (const c of sampleData) {
      if (!countMap[this.sampleMap[c].condition]) {
        countMap[this.sampleMap[c].condition] = 0
      }
      countMap[this.sampleMap[c].condition] ++
    }
    this.conditions = Object.keys(countMap).sort((a: string, b: string) => {
      return countMap[b] - countMap[a]
    })
    this.countMap = countMap
  }

  submit() {
    const f: any = Object.assign({}, this.form.value)
    f["conditionMap"] = this.sampleMap
    const body: any = {
      inputFiles: [this.sessionID],
      form: f,
      operationType: "RQF-IMP",
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
