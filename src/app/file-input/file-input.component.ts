import {Component, EventEmitter, Output} from '@angular/core';
import {CoralService} from "../coral.service";
import {WebService} from "../web.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.sass']
})
export class FileInputComponent {
  selectedFileName: string = ""
  @Output() columns: EventEmitter<string[]> = new EventEmitter<string[]>()
  @Output() sessionID: EventEmitter<string> = new EventEmitter<string>()

  fileSelectionForm = this.fb.group({
    file: []
  })

  constructor(public coral: CoralService, private web: WebService, private fb: FormBuilder) {
    this.fileSelectionForm.controls['file'].valueChanges.subscribe((data: any) => {
      if (data) {
        console.log(data)
        this.columns.emit(data.columns)
        this.sessionID.emit(data.link_id)
        this.selectedFileName = data.file_type.join("_") + data.link_id
      }

    })
  }
  onFileSelected(event: Event) {
    if (event.target) {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        this.selectedFileName = target.files[0].name
        this.web.postFile(target.files[0], 'table').then((res: any) => {
          if (res) {
            this.columns.emit(res.columns)
            this.sessionID.emit(res.link_id)
            //this.columns = res.columns
            //this.sessionID = res.link_id
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

  changeFile(e: any) {
    this.columns.emit(e.columns)
    this.sessionID.emit(e.link_id)
    this.selectedFileName = e.file_type.join("_") + e.link_id
    console.log(e)
  }
}
