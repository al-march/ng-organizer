import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

export interface Task {
  id?: string
  title: string
  date?: string
}

interface TaskResponse {
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  static url = 'https://ang-organizer.firebaseio.com/tasks'

  constructor(private http: HttpClient) { }

  create(task: Task): Observable<Task> {
    return this.http
      .post<TaskResponse>(`${TasksService.url}/${task.date}.json`, task)
      .pipe( map(res => ({ ...task, id: res.name })) )
  }
}
