import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assessment } from 'src/app/datastructure/assessment';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-expansion-card',
  templateUrl: './expansion-card.component.html',
  styleUrls: ['./expansion-card.component.css'],
})
export class ExpansionCardComponent implements OnInit {
  panelOpenState = false;

  @Input('data')
  data: Assessment;

  @Input('name')
  name;

  @Input('cityData')
  cityData: number[];

  @Output()
  selectedAssessment: EventEmitter<string> = new EventEmitter();

  public doughnutChartLabels: Label[] = [
    'Hyderabad',
    'Chennai',
    'Bangalore',
    'Mumbai',
  ];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';

  constructor() {}

  ngOnInit(): void {
    this.doughnutChartData.push(this.cityData);
  }

  clickHandler() {
    this.selectedAssessment.emit(this.data.assessmentTitle);
  }
}
