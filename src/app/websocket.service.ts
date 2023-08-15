import { Injectable } from '@angular/core';
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  connection: WebSocketSubject<any>|undefined
  connecting: boolean = false

  constructor() { }

  connect(url: string) {
    this.connecting = true
    if (!this.connection) {
      this.connection = new WebSocketSubject(url)
      this.connecting = false
      return this.connection
    } else {
      this.connecting = false
      return this.connection
    }
  }

  send(message: any) {
    this.connection?.next(message)
  }

  close() {
    this.connection?.complete()
    this.connection = undefined
  }

  getMessages() {
    return this.connection?.asObservable()
  }
}
