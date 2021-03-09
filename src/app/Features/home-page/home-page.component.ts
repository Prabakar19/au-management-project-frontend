import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Assessment } from 'src/app/datastructure/assessment';
import { Manager } from 'src/app/datastructure/manager';
import { AssessmentService } from 'src/app/Services/assessmentService/assessment.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  assessmentList: Assessment[];
  filteredList: Assessment[];
  totalRecords: number;
  page: number;
  QUIZ: string = 'QUIZ';
  ASSIGNMENT: string = 'ASSIGNMENT';
  PROJECT: string = 'PROJECT';

  //initial key for sort list
  key: string = 'lastUpdated';
  reverse: boolean = false;

  manager: Manager;

  isAssessmentAvailable: boolean = true;

  assessmentNameList: String[];

  constructor(
    private assessmentService: AssessmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllAssessments();
  }

  getAllAssessments() {
    this.assessmentService.getAllAssessmentsRequest().subscribe(
      (res) => {
        this.assessmentList = res;
        this.assessmentNameList = this.assessmentList.map(
          (assessment) => assessment.assessmentTitle
        );
        this.totalRecords = this.assessmentList.length;
        this.filteredList = this.assessmentList;
        console.log(this.assessmentList);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  cardClickHandler(title: string) {
    sessionStorage.setItem('assessment', JSON.stringify(title));
    this.router.navigateByUrl('/assessment');
  }

  //handler for search component
  selectedDataHandler(assess: string) {
    console.log(assess);
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
  }
}
