import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddAssessmentComponent } from 'src/app/Features/add-assessment/add-assessment.component';
import { Assessment } from 'src/app/datastructure/assessment';
import { Manager } from 'src/app/datastructure/manager';
import { AssessmentService } from 'src/app/Services/assessmentService/assessment.service';
import { Material } from 'src/app/datastructure/material';
import { AddMaterialCardComponent } from 'src/app/components/add-material-card/add-material-card.component';
import { MaterialService } from 'src/app/Services/material-service/material.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocationCount } from 'src/app/datastructure/locationCount';

@Component({
  selector: 'app-my-assessments',
  templateUrl: './my-assessments.component.html',
  styleUrls: ['./my-assessments.component.css'],
})
export class MyAssessmentsComponent implements OnInit {
  pageLoaded: boolean = false;
  manager: Manager;

  material: Partial<Material> = {};
  assessmentList: Assessment[];
  filteredList: Assessment[];
  assessmentNameList: String[];
  totalRecords: number;
  page: number;
  QUIZ: string = 'QUIZ';
  ASSIGNMENT: string = 'ASSIGNMENT';
  PROJECT: string = 'PROJECT';

  locationData: LocationCount;
  locationCount: number[];
  locationNames: string[];

  //initial key for sort list
  key: string = 'lastUpdated';
  reverse: boolean = false;
  isAssessmentAvailable: boolean = true;

  constructor(
    private assessmentService: AssessmentService,
    private router: Router,
    public dialog: MatDialog,
    private materialService: MaterialService,
    private _snackBar: MatSnackBar
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
          this.getchartData();

          this.pageLoaded = true;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getchartData() {
    for (let i = 0; i < this.filteredList.length; i++) {
      this.assessmentService
        .getLocationCountRequest(this.filteredList[i].assessmentId)
        .subscribe(
          (res) => {
            this.locationData = res;

            this.locationNames = this.locationData.location;
            this.locationCount = this.locationData.count.map((loc) =>
              parseInt(loc)
            );

            if (this.locationCount.length) {
              this.filteredList[i].locationCount = this.locationCount;
              this.filteredList[i].locationNames = this.locationNames;
            } else {
              this.filteredList[i].locationCount = [1];
              this.filteredList[i].locationNames = ['No data'];
            }
            this.pageLoaded = true;
          },
          (err) => {
            console.log(err);
          }
        );
    }
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

  addMaterial(id: number) {
    const dialogRef = this.dialog.open(AddMaterialCardComponent, {
      width: '600px',
      data: this.manager,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result != undefined && result.title) {
        this.material = result;

        this.materialService.addMaterialRequest(this.material, id).subscribe(
          (res) => {
            this.material = res;
            location.reload();
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

  deleteMaterial(id: number) {
    this.materialService.deleteMaterialRequest(6).subscribe(
      (res) => {
        this.material = res;
        location.reload();
      },
      (err) => {
        console.log(err);
        location.reload();
      }
    );
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
