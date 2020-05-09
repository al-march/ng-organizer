import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from "rxjs/operators";

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

  load(date: moment.Moment): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${TasksService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(map(tasks => {
        if (!tasks) {
          return [];
        };

        return Object.keys(tasks).map(key => ({ id: key, title: tasks[key].title, date: tasks[key].date }))
      }))
  }

  create(task: Task): Observable<Task> {
    return this.http
      .post<TaskResponse>(`${TasksService.url}/${task.date}.json`, task)
      .pipe( map(res => ({ ...task, id: res.name })) )
  }

  remove(task: Task): Observable<void> {
    return this.http
      .delete<void>(`${TasksService.url}/${task.date}/${task.id}.json`)
  }
}
