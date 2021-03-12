import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/datastructure/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projectIdURL = '/api/project/id/';
  addProjectURL = '/api/project/';
  constructor(private http: HttpClient) {}

  addProjectRequest(
    project: Partial<Project>,
    id: number
  ): Observable<Project> {
    return this.http.post<Project>(this.addProjectURL + id, project);
  }

  updateProjectRequest(project: Project, id: number): Observable<Project> {
    return this.http.put<Project>(this.projectIdURL + id, project);
  }

  deleteProjectRequest(id: number): Observable<Project> {
    return this.http.delete<Project>(this.projectIdURL + id);
  }
}
