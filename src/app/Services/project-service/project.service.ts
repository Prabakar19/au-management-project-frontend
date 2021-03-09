import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/datastructure/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projectIdURL = '/api/project/id/';
  constructor(private http: HttpClient) {}

  updateProjectRequest(project: Project, id: number): Observable<Project> {
    return this.http.put<Project>(this.projectIdURL + id, project);
  }

  deleteProjectRequest(id: number): Observable<Project> {
    return this.http.delete<Project>(this.projectIdURL + id);
  }
}
