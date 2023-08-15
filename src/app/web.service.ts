import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http: HttpClient) { }

  async post(url: string, body: File) {
    const formData = new FormData();
    formData.append('file', body);
    return this.http.post(url, formData, {reportProgress: true}).toPromise()
  }

  async postParameters(url: string, body: any) {
    return this.http.post(url, body).toPromise()
  }
}
