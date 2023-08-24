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
  selector: 'app-normalization-qfeatures',
  templateUrl: './normalization-qfeatures.component.html',
  styleUrls: ['./normalization-qfeatures.component.sass']
})
export class NormalizationQfeaturesComponent {
    @Output() operation: EventEmitter<any> = new EventEmitter<any>()
    columns: string[] = []
    selectedFileName: string = ""
    operationTypeChoices: string[] = ["RQF-PROT", "RQF-PEP"]
    form: FormGroup = this.fb.group({
        normalization: ["quantiles.robust",Validators.required],
        sampleColumns: [[], Validators.required],
        indexColumn: [null, Validators.required],
        dataCompleteness: [1, Validators.required],
        log2: [true, Validators.required],
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
    plotDataBefore: any[] = []
    plotDataAfter: any[] = []
    plotLayoutBefore: any = {
        margin: {t:50, b:200, l:50, r:25},
        title: "Before Normalization",
        xaxis: {
            title: "Samples",
            tickvals: [],
            ticktext: []
        },
        yaxis: {title: "log2 Intensity Value"},
        annotations: [],
        shapes: [],
        showlegend: true,
        legend: {
            orientation: 'h'
        },
        font: {
            family: "Arial, serif",
        }
    }
    plotLayoutAfter: any = {
        margin: {t:50, b:200, l:50, r:25},
        title: "After Normalization",
        xaxis: {
            title: "Samples",
            tickvals: [],
            ticktext: []
        },
        yaxis: {title: "log2 Intensity Value"},
        annotations: [],
        shapes: [],
        showlegend: true,
        legend: {
            orientation: 'h'
        },
        font: {
            family: "Arial, serif",
        }
    }
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
        console.log(event)
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
            operationType: "RQF-NORM",
            sessionId: this.ws.sessionID,
        }
        const task: Task = new Task(0, body["operationType"], "Created")
        this.task.tasks.push(task)
        this.outputFiles = []
        task.statusSub.asObservable().subscribe((status: any) => {
            if (status === "Completed") {
                this.outputFiles = task.value.output_files
                for (const file of this.outputFiles) {
                    if (file.file_type.includes("json") && file.file_type.includes("boxplot")) {
                        this.web.downloadText(file.file).then((res: any) => {
                            const data = JSON.parse(res)
                            this.plotLayoutBefore.xaxis.tickvals = data.tick_val
                            this.plotLayoutBefore.xaxis.ticktext = data.tick_text
                            this.plotLayoutAfter.xaxis.tickvals = data.tick_val
                            this.plotLayoutAfter.xaxis.ticktext = data.tick_text
                            this.plotDataBefore = data.graph_box_before_normalization
                            this.plotDataAfter = data.graph_box_after_normalization
                            console.log(this.plotDataBefore)
                            console.log(this.plotDataAfter)

                        })
                    }
                }
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
        a.setAttribute("download", file.file_type.join("_") + ".txt")
        a.setAttribute("target", "_blank")
        document.body.appendChild(a)
        a.click()
        a.remove()
    }

    updateColumns(columns: string[]) {
        console.log(columns)
    }
}
