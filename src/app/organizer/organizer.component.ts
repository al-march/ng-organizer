import { Component, OnInit } from '@angular/core';
import { DateService } from '../shared/date.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  taskInput: FormControl = new FormControl('', Validators.required)

  constructor(public dateService: DateService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const {value: title} = this.taskInput;
    this.taskInput.reset();
  }

}
