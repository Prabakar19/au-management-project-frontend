import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent implements OnInit {
  @Input('data')
  data;

  @Input('title')
  title;

  @Output()
  selectedItem: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  setSelectedValueForParent(selected) {
    this.selectedItem.emit(selected);
  }
}
