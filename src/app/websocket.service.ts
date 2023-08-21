import { Injectable } from '@angular/core';
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";
import * as readableuids from "uuid-readable";
import {webSocket} from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  connection: WebSocketSubject<any>|undefined
  connecting: boolean = false
  messages: any[] = []
  sessionID: string = readableuids.short(crypto.randomUUID()).replace(/\s/g, "")
  eventStreamConnected: boolean = false
  constructor() { }

  connect(url: string) {
    this.connecting = true
    if (!this.connection) {
      // @ts-ignore
      this.connection = new webSocket({
        url: url,
        openObserver: {
          next: () => {
            console.log("connected to " + url)
            this.eventStreamConnected = true
          }
        },
        closeObserver: {
          next: () => {
            console.log("closed connection to " + url)
            this.eventStreamConnected = false
          }
        }
      })
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
