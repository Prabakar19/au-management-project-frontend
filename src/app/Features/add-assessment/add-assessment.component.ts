import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddAssignmentComponent } from 'src/app/components/add-assignment/add-assignment.component';
import { AddProjectComponent } from 'src/app/components/add-project/add-project.component';
import { AddQuizComponent } from 'src/app/components/add-quiz/add-quiz.component';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Assessment } from 'src/app/datastructure/assessment';
import { Assignment } from 'src/app/datastructure/assignment';
import { Course } from 'src/app/datastructure/course';
import { Manager } from 'src/app/datastructure/manager';
import { Project } from 'src/app/datastructure/project';
import { Quiz } from 'src/app/datastructure/quiz';
import { AssessmentService } from 'src/app/Services/assessmentService/assessment.service';
import { AssignmentService } from 'src/app/Services/assignment-service/assignment.service';
import { ProjectService } from 'src/app/Services/project-service/project.service';
import { QuizService } from 'src/app/Services/quiz-service/quiz.service';

@Component({
  selector: 'app-add-assessment',
  templateUrl: './add-assessment.component.html',
  styleUrls: ['./add-assessment.component.css'],
})
export class AddAssessmentComponent implements OnInit {
  isEditable: boolean = false;
  assessment: Partial<Assessment> = {};
  quizSet: Partial<Quiz>[] = [];
  quiz: Partial<Quiz> = {};
  assignmentSet: Partial<Assignment>[] = [];
  assignment: Partial<Assignment> = {};
  projectSet: Partial<Project>[] = [];
  project: Partial<Project> = {};
  manager: Manager;

  courseList: Course[];
  course: Course;
  courseNameList: string[];

  assessmentForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  typeList: string[] = ['QUIZ', 'ASSIGNMENT', 'PROJECT'];

  constructor(
    private fb: FormBuilder,
    private assessmentService: AssessmentService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private quizService: QuizService,
    private assignmentService: AssignmentService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.manager = JSON.parse(localStorage.getItem('usertoken'));
    this.getAllCourse();
  }

  getAllCourse() {
    this.assessmentService.getAllCourseRequest().subscribe(
      (res) => {
        this.courseList = res;

        this.courseNameList = this.courseList.map(
          (course) => course.courseName
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  selectCourseHandler(courseTitle: string) {
    this.assessment.courseId = this.courseList.find(
      (course) => course.courseName == courseTitle
    ).courseId;
  }

  selectTypeHandler(type: string) {
    this.assessment.type = type;
  }

  saveAssessment() {
    if (
      this.assessmentForm.valid &&
      this.assessment.type &&
      this.assessment.courseId
    ) {
      this.assessment.assessmentTitle = this.assessmentForm.controls[
        'title'
      ].value;
      this.assessment.description = this.assessmentForm.controls[
        'description'
      ].value;
      this.assessment.managerId = this.manager.managerId;

      this.assessmentService.addAssessmentRequest(this.assessment).subscribe(
        (res) => {
          this.assessment = res;
          console.log(this.assessment);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  dialogHandler() {
    if (this.assessment.type == 'QUIZ') this.quizHandler();
    else if (this.assessment.type == 'ASSIGNMENT') this.assignmentHandler();
    else if (this.assessment.type == 'PROJECT') this.projectHandler();
  }

  quizHandler() {
    const dialogRef = this.dialog.open(AddQuizComponent, {
      width: '600px',
      data: this.quiz,
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
              this.quiz = {};
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
  }

  assignmentHandler() {
    const dialogRef = this.dialog.open(AddAssignmentComponent, {
      width: '600px',
      data: this.assignment,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (
        result != undefined &&
        result.title &&
        result.description &&
        result.totalScore
      ) {
        this.assignment = result;
        this.assignmentService
          .addAssignmentRequest(this.assignment, this.assessment.assessmentId)
          .subscribe(
            (res) => {
              this.assignment = res;
              this.assignmentSet.push(this.assignment);
              this.assignment = {};
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
  }

  projectHandler() {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: '600px',
      data: this.project,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (
        result != undefined &&
        result.title &&
        result.description &&
        result.buildScore &&
        result.processScore &&
        result.testingScore &&
        result.totalScore
      ) {
        this.project = result;
        this.projectService
          .addProjectRequest(this.project, this.assessment.assessmentId)
          .subscribe(
            (res) => {
              this.project = res;
              this.projectSet.push(this.project);
              this.project = {};
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

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: 'You are not autherized user!!',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
