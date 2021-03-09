import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assessment } from 'src/app/datastructure/assessment';

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

  @Output()
  selectedAssessment: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  clickHandler() {
    this.selectedAssessment.emit(this.data.assessmentTitle);
  }
}
