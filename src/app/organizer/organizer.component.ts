import { Component, OnInit } from '@angular/core';
import { DateService } from '../shared/date.service';
import { FormControl, Validators } from '@angular/forms';
import { TasksService, Task } from '../shared/tasks.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  taskInput: FormControl = new FormControl('', Validators.required)

  constructor(public dateService: DateService, private taskService: TasksService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const { value: title } = this.taskInput;

    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    }

    this.taskService.create(task).subscribe(task => {
      this.taskInput.reset();
    }, err => console.error(err))
  }

}
