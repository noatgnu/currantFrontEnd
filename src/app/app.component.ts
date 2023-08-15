import { Component } from '@angular/core';
import {WebService} from "./web.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WebsocketService} from "./websocket.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Currant';

}
