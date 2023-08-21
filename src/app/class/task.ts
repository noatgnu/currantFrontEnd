import {Subject} from "rxjs";

export class Task {
  id: number|undefined
  operation: string = ""
  status: string = "Queued"
  value: any
  statusSub: Subject<any> = new Subject<any>()
  constructor(id: number|undefined, operation: string, value: any) {
    this.id = id
    this.operation = operation
    this.value = value
  }

}
