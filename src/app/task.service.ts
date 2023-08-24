import { Injectable } from '@angular/core';
import {Task} from "./class/task";
import { TaskDictionary } from './interface/task-dictionary';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[] = []
  taskMap: TaskDictionary = {}
  newTaskStarted: Subject<boolean> = new Subject<boolean>()
  constructor() { }
}
