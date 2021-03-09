import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Project } from 'src/app/datastructure/project';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent implements OnInit {
  @Input('project')
  project: Project;
  toggle: boolean = true;

  @Output()
  updatedProject: EventEmitter<Project> = new EventEmitter();

  @Output()
  removeItem: EventEmitter<number> = new EventEmitter();

  updationForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    buildScore: ['', [Validators.required]],
    processScore: ['', [Validators.required]],
    testingScore: ['', [Validators.required]],
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
      title: this.project.title,
      description: this.project.description,
      buildScore: this.project.buildScore,
      processScore: this.project.processScore,
      testingScore: this.project.testingScore,
      totalScore: this.project.totalScore,
    });
  }

  saveProject() {
    if (this.updationForm.valid) {
      this.project.title = this.updationForm.controls['title'].value;
      this.project.description = this.updationForm.controls[
        'description'
      ].value;
      this.project.buildScore = this.updationForm.controls['buildScore'].value;
      this.project.processScore = this.updationForm.controls[
        'processScore'
      ].value;
      this.project.testingScore = this.updationForm.controls[
        'testingScore'
      ].value;
      this.project.totalScore = this.updationForm.controls['totalScore'].value;

      this.updatedProject.emit(this.project);
      this.toggle = !this.toggle;
    }
  }

  removeProject() {
    this.removeItem.emit(this.project.projectId);
  }
}
