import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Assignment } from 'src/app/datastructure/assignment';

@Component({
  selector: 'app-assignment-card',
  templateUrl: './assignment-card.component.html',
  styleUrls: ['./assignment-card.component.css'],
})
export class AssignmentCardComponent implements OnInit {
  @Input('assignment')
  assignment: Assignment;
  toggle: boolean = true;

  @Output()
  updatedAssignment: EventEmitter<Assignment> = new EventEmitter();

  @Output()
  removeItem: EventEmitter<number> = new EventEmitter();

  updationForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    totalScore: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}
  ngOnInit() {}

  enableEdit() {
    this.toggle = !this.toggle;
    this.setDefault();
  }

  setDefault() {
    this.updationForm.setValue({
      title: this.assignment.title,
      description: this.assignment.description,
      totalScore: this.assignment.totalScore,
    });
  }

  saveAssignment() {
    if (this.updationForm.valid) {
      this.assignment.title = this.updationForm.controls['title'].value;
      this.assignment.description = this.updationForm.controls[
        'description'
      ].value;
      this.assignment.totalScore = this.updationForm.controls[
        'totalScore'
      ].value;

      this.updatedAssignment.emit(this.assignment);
      this.toggle = !this.toggle;
    }
  }

  removeAssignment() {
    this.removeItem.emit(this.assignment.assignmentId);
  }
}
