import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assessment } from 'src/app/datastructure/assessment';
import { Manager } from 'src/app/datastructure/manager';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  allAssessmentURL: string = '/api/assessment/';
  getAssessmentByNameURL: string = '/api/assessment/name/';
  getManagerURL: string = '/api/manager';

  constructor(private http: HttpClient) {}

  updateAssessmentRequest(
    assessment: Assessment,
    id: number
  ): Observable<Assessment> {
    return this.http.put<Assessment>(this.allAssessmentURL + id, assessment);
  }

  deleteAssessmentRequest(id: number): Observable<Assessment> {
    return this.http.delete<Assessment>(this.allAssessmentURL + id);
  }

  getAllAssessmentsRequest(): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(this.allAssessmentURL);
  }

  getManagerRequest(id: number): Observable<Manager> {
    return this.http.get<Manager>(this.getManagerURL);
  }

  getAssessmentByNameRequest(name: string): Observable<Assessment> {
    return this.http.get<Assessment>(this.getAssessmentByNameURL + name);
  }
}
