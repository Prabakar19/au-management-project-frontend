import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddQuizComponent } from 'src/app/components/add-quiz/add-quiz.component';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Assessment } from 'src/app/datastructure/assessment';
import { Assignment } from 'src/app/datastructure/assignment';
import { Manager } from 'src/app/datastructure/manager';
import { Project } from 'src/app/datastructure/project';
import { Quiz } from 'src/app/datastructure/quiz';
import { AssessmentService } from 'src/app/Services/assessmentService/assessment.service';
import { AssignmentService } from 'src/app/Services/assignment-service/assignment.service';
import { ProjectService } from 'src/app/Services/project-service/project.service';
import { QuizService } from 'src/app/Services/quiz-service/quiz.service';

@Component({
  selector: 'app-assessment-screen',
  templateUrl: './assessment-screen.component.html',
  styleUrls: ['./assessment-screen.component.css'],
})
export class AssessmentScreenComponent implements OnInit {
  pageLoaded: boolean = false;
  toggle: boolean = true;

  assessmentName: string;
  assessment: Assessment;
  quizSet: Quiz[];
  quizLength: number;
  quiz: Quiz;
  quiz1: Partial<Quiz> = {};
  assignmentSet: Assignment[];
  assignmentLength: number;
  assignment: Assignment;
  projectSet: Project[];
  projectLength: number;
  project: Project;

  manager: Manager;

  updationForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  constructor(
    private assessmentService: AssessmentService,
    private quizService: QuizService,
    private assignmentService: AssignmentService,
    private projectService: ProjectService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAssessment();
  }

  getAssessment() {
    this.manager = JSON.parse(localStorage.getItem('usertoken'));
    this.assessmentName = JSON.parse(sessionStorage.getItem('assessment'));
    this.assessmentService
      .getAssessmentByNameRequest(this.assessmentName)
      .subscribe(
        (res) => {
          this.assessment = res;
          this.quizSet = this.assessment.quizSet;
          this.assignmentSet = this.assessment.assignmentSet;
          this.projectSet = this.assessment.projectSet;
          this.quizLength = this.quizSet.length;
          this.assignmentLength = this.assignmentSet.length;
          this.projectLength = this.projectSet.length;
          this.pageLoaded = true;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  enableEdit() {
    this.toggle = !this.toggle;
    this.setDefault();
  }

  setDefault() {
    this.updationForm.setValue({
      title: this.assessment.assessmentTitle,
      description: this.assessment.description,
    });
  }

  saveAssessmentHandler() {
    if (this.updationForm.valid) {
      this.assessment.assessmentTitle = this.updationForm.controls[
        'title'
      ].value;
      this.assessment.description = this.updationForm.controls[
        'description'
      ].value;
      this.updateAssessment();
      this.toggle = !this.toggle;
    }
  }

  updateAssessment() {
    if (this.manager.managerId == this.assessment.managerId) {
      this.assessmentService
        .updateAssessmentRequest(this.assessment, this.assessment.assessmentId)
        .subscribe(
          (res) => {
            this.assessment = res;
            sessionStorage.setItem(
              'assessment',
              JSON.stringify(this.assessment.assessmentTitle)
            );
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      this.openDialog();
    }
  }

  removeAssessmentHandler() {
    if (this.manager.managerId == this.assessment.managerId) {
      this.assessmentService
        .deleteAssessmentRequest(this.assessment.assessmentId)
        .subscribe(
          (res) => {
            this.assessment = res;
          },
          (err) => {
            console.log(err);
          }
        );
      location.reload();
    } else {
      this.openDialog();
    }
  }

  updatedQuizHandler(quiz: Quiz) {
    if (this.assessment.managerId == this.manager.managerId) {
      this.quizService.updateQuizRequest(quiz, quiz.quizId).subscribe(
        (res) => {
          this.quiz = res;
        },
        (err) => {
          console.log(err);
        }
      );
      console.log(quiz);
    } else {
      this.openDialog();
    }
  }

  removeQuizHandler(id: number) {
    if (this.assessment.managerId == this.manager.managerId) {
      this.quizService.deleteQuizRequest(id).subscribe(
        (res) => {
          this.quiz = res;
        },
        (err) => {
          console.log(err);
        }
      );
      location.reload();
    } else {
      this.openDialog();
    }
  }

  updatedAssignmentHandler(assignment: Assignment) {
    if (this.assessment.managerId == this.manager.managerId) {
      this.assignmentService
        .updateAssignmentzRequest(assignment, assignment.assignmentId)
        .subscribe(
          (res) => {
            this.assignment = res;
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      this.openDialog();
    }
  }

  deleteAssignmentHandler(id: number) {
    if (this.assessment.managerId == this.manager.managerId) {
      this.assignmentService.deleteAssignmentRequest(id).subscribe(
        (res) => {
          this.assignment = res;
        },
        (err) => {
          console.log(err);
        }
      );
      location.reload();
    } else {
      this.openDialog();
    }
  }

  updatedProjectHandler(project: Project) {
    if (this.assessment.managerId == this.manager.managerId) {
      this.projectService
        .updateProjectRequest(project, project.projectId)
        .subscribe(
          (res) => {
            this.project = res;
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      this.openDialog();
    }
  }
  deleteProjectHandler(id: number) {
    if (this.assessment.managerId == this.manager.managerId) {
      this.projectService.deleteProjectRequest(id).subscribe(
        (res) => {
          this.project = res;
        },
        (err) => {
          console.log(err);
        }
      );
      location.reload();
    } else {
      this.openDialog();
    }
  }

  quizHandler() {
    if (this.assessment.managerId == this.manager.managerId) {
      const dialogRef = this.dialog.open(AddQuizComponent, {
        width: '600px',
        data: this.quiz1,
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        if (
          result != undefined &&
          result.question &&
          result.option1 &&
          result.option2 &&
          result.option3 &&
          result.option4 &&
          result.answer &&
          result.score
        ) {
          this.quiz = result;

          this.quizService
            .addQuizRequest(this.quiz, this.assessment.assessmentId)
            .subscribe(
              (res) => {
                this.quiz = res;
                this.quizSet.push(this.quiz);
              },
              (err) => {
                console.log(err);
              }
            );
        } else {
          this._snackBar.open('not added', 'cancel', {
            duration: 2000,
          });
        }
      });
    } else {
      this.openDialog();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: "You can not modify other's assessment details!!",
    });

    dialogRef.afterClosed().subscribe((result) => {
      location.reload();
    });
  }
}
