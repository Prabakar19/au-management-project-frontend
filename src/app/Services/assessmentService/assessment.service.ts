import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assessment } from 'src/app/datastructure/assessment';
import { Course } from 'src/app/datastructure/course';
import { Manager } from 'src/app/datastructure/manager';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  allAssessmentURL: string = '/api/assessment/';
  assessByManagerId: string = '/manager/';
  getAssessmentByNameURL: string = '/api/assessment/name/';
  getManagerURL: string = '/api/manager';
  courseURL: string = '/api/course/';

  constructor(private http: HttpClient) {}

  addAssessmentRequest(
    assessment: Partial<Assessment>
  ): Observable<Assessment> {
    return this.http.post<Assessment>(this.allAssessmentURL, assessment);
  }
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

  getAllAssessByManagerIdRequest(id: number): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(
      this.allAssessmentURL + this.assessByManagerId + id
    );
  }

  getManagerRequest(id: number): Observable<Manager> {
    return this.http.get<Manager>(this.getManagerURL);
  }

  getAssessmentByNameRequest(name: string): Observable<Assessment> {
    return this.http.get<Assessment>(this.getAssessmentByNameURL + name);
  }

  getAllCourseRequest(): Observable<Course[]> {
    return this.http.get<Course[]>(this.courseURL);
  }
}
