import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {TaskService} from "./task.service";

@Injectable({
  providedIn: 'root'
})
export class WebService {

  host = "10.201.112.183:8000"
  baseUrl = "http://" + this.host
  constructor(private http: HttpClient, private task: TaskService) { }

  async postFile(body: File, fileType: string = "text") {
    const formData = new FormData();
    formData.append('file', body);
    formData.append('fileType', fileType);
    this.task.newTaskStarted.next(true)
    return this.http.post(`${this.baseUrl}/api/file/`, formData, {reportProgress: true}).toPromise()
  }

  async postParameters( body: any) {
    this.task.newTaskStarted.next(true)
    return this.http.post(`${this.baseUrl}/api/operation/`, body).toPromise()
  }


  async getOperation(id: number) {
    return this.http.get(`${this.baseUrl}/api/operation/${id}/`).toPromise()
  }

  async saveSession(body: any) {
    return this.http.post(`${this.baseUrl}/api/session/`, body).toPromise()
  }

  async downloadText(url: string) {
    return this.http.get(url, {responseType: 'text'}).toPromise()
  }
}
