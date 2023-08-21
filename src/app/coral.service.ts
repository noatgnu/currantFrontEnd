import { Injectable } from '@angular/core';
import {Coral} from "./class/coral";

@Injectable({
  providedIn: 'root'
})
export class CoralService {
  coral: Coral = new Coral("", "")
  constructor() { }
}
