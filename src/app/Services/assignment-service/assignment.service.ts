import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignment } from 'src/app/datastructure/assignment';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  assignmentIdURL = '/api/assignment/id/';
  constructor(private http: HttpClient) {}

  updateAssignmentzRequest(
    assignment: Assignment,
    id: number
  ): Observable<Assignment> {
    return this.http.put<Assignment>(this.assignmentIdURL + id, assignment);
  }

  deleteAssignmentRequest(id: number): Observable<Assignment> {
    return this.http.delete<Assignment>(this.assignmentIdURL + id);
  }
}
