import { Injectable } from '@angular/core';
import {Task} from "./class/task";
import { TaskDictionary } from './interface/task-dictionary';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[] = []
  taskMap: TaskDictionary = {}
  constructor() { }
}
