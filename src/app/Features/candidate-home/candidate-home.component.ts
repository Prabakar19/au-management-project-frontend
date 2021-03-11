import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChartType } from 'chart.js';
import {
  Label,
  MultiDataSet,
  PluginServiceGlobalRegistrationAndOptions,
} from 'ng2-charts';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Assessment } from 'src/app/datastructure/assessment';
import { Candidate } from 'src/app/datastructure/candidate';
import { CandidateAssessment } from 'src/app/datastructure/candidate-assessment';
import { AssessmentService } from 'src/app/Services/assessmentService/assessment.service';
import { AuthGuardService } from 'src/app/Services/Auth/auth-guard.service';
import { CandidateService } from 'src/app/Services/candidate-service/candidate.service';

@Component({
  selector: 'app-candidate-home',
  templateUrl: './candidate-home.component.html',
  styleUrls: ['./candidate-home.component.css'],
})
export class CandidateHomeComponent implements OnInit {
  assessmentList: Assessment[];
  asessmentNameList: string[];
  assessment: Assessment;
  myScore: number;
  myFeedback: string;
  candidateAssessment: Partial<CandidateAssessment> = {};
  candidate: Candidate;

  overAllPercentage: number = 0;
  public doughnutChartLabels: Label[] = ['Percentage', ' '];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartPlugins: PluginServiceGlobalRegistrationAndOptions[] = [];

  constructor(
    private authGuargService: AuthGuardService,
    private router: Router,
    private assessmentService: AssessmentService,
    private candidateService: CandidateService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllAssessments();
    this.drawPercentage();
    this.candidate = JSON.parse(localStorage.getItem('candidatetoken'));
  }

  drawPercentage() {
    this.overAllPercentage = 60;
    this.doughnutChartData.push([
      this.overAllPercentage,
      100 - this.overAllPercentage,
    ]);

    this.doughnutChartPlugins.push({
      beforeDraw(chart) {
        const ctx = chart.ctx;
        var centerTxt = this.overAllPercentage ? this.overAllPercentage : '60';

        const sidePadding = 60;

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
        const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

        ctx.fillStyle = 'blue';

        ctx.fillText(centerTxt + '%', centerX, centerY);
      },
    });
  }

  getAllAssessments() {
    this.assessmentService.getAllAssessmentsRequest().subscribe(
      (res) => {
        this.assessmentList = res;
        this.asessmentNameList = this.assessmentList.map(
          (assessment) => assessment.assessmentTitle
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  selectAssessmentHandler(assessTitle: string) {
    let value = this.assessmentList.map((assess) => {
      if (assess.assessmentTitle == assessTitle) this.assessment = assess;
    });

    console.log(this.assessment);
  }

  storeMark() {
    this.candidateAssessment.assessmentId = this.assessment.assessmentId;
    this.candidateAssessment.candidateId = this.candidate.candidateId;
    this.candidateAssessment.maxScore = this.assessment.score;
    this.candidateAssessment.score = this.myScore;
    this.candidateAssessment.feedback = this.myFeedback;

    if (this.candidateAssessment.maxScore >= this.candidateAssessment.score) {
      this.candidateService
        .addCandidateScoreRequest(this.candidateAssessment)
        .subscribe(
          (res) => {
            this.candidateAssessment = res;
            this.openDialog('Score Added! YAY!!');
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      this.openDialog('Failed! Your score is greater than maximum score');
    }
  }

  openDialog(message: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: message,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.myFeedback = '';
      this.myScore = undefined;
    });
  }

  logout() {
    this.authGuargService.candidatelogout();
    this.router.navigateByUrl('/candidatelogin');
  }
}
