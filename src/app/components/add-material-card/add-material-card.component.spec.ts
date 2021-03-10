import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaterialCardComponent } from './add-material-card.component';

describe('AddMaterialCardComponent', () => {
  let component: AddMaterialCardComponent;
  let fixture: ComponentFixture<AddMaterialCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMaterialCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMaterialCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
