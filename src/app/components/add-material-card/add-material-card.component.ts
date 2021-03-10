import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Material } from 'src/app/datastructure/material';

@Component({
  selector: 'app-add-material-card',
  templateUrl: './add-material-card.component.html',
  styleUrls: ['./add-material-card.component.css'],
})
export class AddMaterialCardComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddMaterialCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Material
  ) {}
  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
