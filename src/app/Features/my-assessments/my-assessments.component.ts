import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddAssessmentComponent } from 'src/app/Features/add-assessment/add-assessment.component';
import { Assessment } from 'src/app/datastructure/assessment';
import { Manager } from 'src/app/datastructure/manager';
import { AssessmentService } from 'src/app/Services/assessmentService/assessment.service';

@Component({
  selector: 'app-my-assessments',
  templateUrl: './my-assessments.component.html',
  styleUrls: ['./my-assessments.component.css'],
})
export class MyAssessmentsComponent implements OnInit {
  manager: Manager;
  assessmentList: Assessment[];
  filteredList: Assessment[];
  assessmentNameList: String[];
  totalRecords: number;
  page: number;
  QUIZ: string = 'QUIZ';
  ASSIGNMENT: string = 'ASSIGNMENT';
  PROJECT: string = 'PROJECT';

  //initial key for sort list
  key: string = 'lastUpdated';
  reverse: boolean = false;
  isAssessmentAvailable: boolean = true;

  constructor(
    private assessmentService: AssessmentService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.manager = JSON.parse(localStorage.getItem('usertoken'));
    this.getMyAssessments();
  }

  getMyAssessments() {
    this.assessmentService
      .getAllAssessByManagerIdRequest(this.manager.managerId)
      .subscribe(
        (res) => {
          this.assessmentList = res;
          this.assessmentNameList = this.assessmentList.map(
            (assessment) => assessment.assessmentTitle
          );

          this.totalRecords = this.assessmentList.length;
          this.filteredList = this.assessmentList;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  createClickHandler() {
    this.router.navigateByUrl('/addassessment');
  }

  cardClickHandler(title: string) {
    sessionStorage.setItem('assessment', JSON.stringify(title));
    this.router.navigateByUrl('/assessment');
  }

  selectedDataHandler(assess: string) {
    sessionStorage.setItem('assessment', JSON.stringify(assess));
    this.router.navigateByUrl('/assessment');
  }

  //sorting list
  sortBy(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  //filtering
  filterType(type) {
    this.filteredList = this.assessmentList.filter(
      (assessment) => assessment.type == type
    );
    this.totalRecords = this.filteredList.length;
  }
}
