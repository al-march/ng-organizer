import { Component, OnInit } from '@angular/core';
import { DateService } from '../shared/date.service';
import { FormControl, Validators } from '@angular/forms';
import { TasksService, Task } from '../shared/tasks.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  taskInput: FormControl = new FormControl('', Validators.required);
  tasks: Task[] = [];

  constructor(public dateService: DateService, private taskService: TasksService) { }

  ngOnInit(): void {
    this.dateService.date
      .pipe(switchMap(value => this.taskService.load(value)))
      .subscribe(tasks => this.tasks = tasks)
  }

  onSubmit() {
    const { value: title } = this.taskInput;

    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    }

    this.taskService.create(task).subscribe(
      task => {
        this.taskInput.reset();
        this.tasks.push(task)
      },
      err => console.error(err))
  }

  removeTask(task: Task) {
    this.taskService.remove(task).subscribe(
      () => this.tasks = this.tasks.filter(t => t.id !== task.id),
      err => console.error(err)
    )
  }

}
