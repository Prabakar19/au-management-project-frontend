import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionCardComponent } from './expansion-card.component';

describe('ExpansionCardComponent', () => {
  let component: ExpansionCardComponent;
  let fixture: ComponentFixture<ExpansionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpansionCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
