import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {WebService} from "../web.service";
import {WebsocketService} from "../websocket.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TaskService} from "../task.service";
import {Task} from "../class/task";
import {Coral} from "../class/coral";
import {CoralService} from "../coral.service";

@Component({
  selector: 'app-differential-analysis-qfeatures',
  templateUrl: './differential-analysis-qfeatures.component.html',
  styleUrls: ['./differential-analysis-qfeatures.component.sass']
})
export class DifferentialAnalysisQfeaturesComponent {
  @Output() operation: EventEmitter<any> = new EventEmitter<any>()
  columns: string[] = []
  selectedFileName: string = ""
  operationTypeChoices: string[] = ["RQF-PROT", "RQF-PEP"]
  form: FormGroup = this.fb.group({
    normalization: ["quantiles.robust",],
    imputation: ["knn",],
    dataCompleteness: [1, Validators.required],
    sampleColumns: [[], Validators.required],
    indexColumn: [null, Validators.required],
    diffTest: ["limma", Validators.required],
    conditionA: [null, Validators.required],
    conditionB: [null, Validators.required],
    log2: [true, Validators.required],
    operationType: ["RQF-PROT", Validators.required],
    aggregateColumn: [null,],
  })

  outputFiles: any[] = []

  sampleMap: any = {}
  wsSub: Subscription = new Subscription()
  conditions: string[] = []
  normalization: string[] = ["sum", "max", "center.mean", "center.median", "div.mean", "div.median", "diff.meda", "quantiles", "quantiles.robust", "vsn"]
  imputation: string[] = ["neighbour_average", "knn", "mle", "mle2", "bpca", "mixed", "min", "MinDet", "MinProb", "QRILC", "zero", "RF"]
  diffTest: string[] = ["limma"]
  wsURL: string = "ws://10.201.84.175:8000/ws/operation/1/2/"

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
  onFileSelected(event: Event) {
    if (event.target) {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        this.selectedFileName = target.files[0].name
        this.web.postFile(target.files[0], 'table').then((res: any) => {
          if (res) {
            this.columns = res.columns
            this.sessionID = res.link_id
            this.coral.coral.addFile(res)
            this.selectedFileName = res.file_type.join("_") + res.link_id
            /*this.ws.connect(this.wsURL + res.session_id + "/ws/")
            if (this.wsSub) {
              this.wsSub.unsubscribe()
            }
            // @ts-ignore
            this.wsSub = this.ws.getMessages().subscribe((msg: any) => {
              console.log(msg)
            })
            this.ws.send({type: "upload", data: res.session_id})*/
          }
        })
      }
    }
  }

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
      operationType: this.form.value.operationType,
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

  downloadFile(file: any) {
    const a = document.createElement("a")
    a.setAttribute("href", file.file)
    a.setAttribute("download", file.file_type + ".txt")
    a.setAttribute("target", "_blank")
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  changeFile(e: any) {
    this.columns = e.columns
    this.sessionID = e.link_id
    this.selectedFileName = e.file_type.join("_") + e.link_id
  }
}
