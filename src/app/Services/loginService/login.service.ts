import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manager } from './../../datastructure/manager';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginUrl: string = '/api/manager/login';

  constructor(private http: HttpClient) {}

  loginRequest(data: Manager): Observable<Manager> {
    return this.http.post<Manager>(this.loginUrl, data);
  }
}
