import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {WebService} from "../web.service";
import {WebsocketService} from "../websocket.service";

@Component({
  selector: 'app-differential-analysis',
  templateUrl: './differential-analysis.component.html',
  styleUrls: ['./differential-analysis.component.sass']
})
export class DifferentialAnalysisComponent {
  columns: string[] = []
  selectedFileName: string = ""
  form: FormGroup = this.fb.group({
    normalization: ["quantile",],
    imputation: ["knn",],
    dataCompleteness: [0, Validators.required],
    sampleColumns: [[], Validators.required],
    indexColumn: [null, Validators.required],
    diffTest: ["welch-ttest", Validators.required],
    conditionA: [null, Validators.required],
    conditionB: [null, Validators.required],
    log2: [true, Validators.required],
    removeContaminants: [true, Validators.required],
  })

  sampleMap: any = {}
  wsSub: Subscription = new Subscription()
  conditions: string[] = []
  normalization: string[] = ["zscore", "quantile", "linear", "vst"]
  imputation: string[] = ["mean", "median", "knn", "randomforest"]
  diffTest: string[] = ["wald", "ttest", "welch-ttest", "sam", "paired-ttest"]
  wsURL: string = "ws://localhost:8000/session/"

  sessionID: string = ""
  constructor(
    private web: WebService,
    private fb: FormBuilder,
    private ws: WebsocketService
  ) {
    this.form.controls["sampleColumns"].valueChanges.subscribe((data) => {
      this.updateConditions(data)
    })
  }
  countMap: any = {}
  onFileSelected(event: Event) {
    if (event.target) {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        this.selectedFileName = target.files[0].name
        this.web.post("http://localhost:8000/api/file/", target.files[0]).then((res: any) => {
          if (res) {
            this.columns = res.columns
            this.sessionID = res.link_id

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
    this.updateSummary(undefined)
  }

  updateSummary(event: any) {
    const countMap: any = {}
    for (const c of this.form.value.sampleColumns) {
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
      form: f
    }
    this.web.postParameters("http://localhost:8000/api/operation/", body).then((res: any) => {
      console.log(res)
    })
  }
}
