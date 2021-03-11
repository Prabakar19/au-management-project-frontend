import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manager } from './../../datastructure/manager';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginUrl: string = '/api/manager/login';
  googleloginUrl: string = '/api/manager/googlelogin';

  constructor(private http: HttpClient) {}

  loginRequest(data: Partial<Manager>): Observable<Manager> {
    return this.http.post<Manager>(this.loginUrl, data);
  }

  googleloginRequest(data: Partial<Manager>): Observable<Manager> {
    return this.http.post<Manager>(this.googleloginUrl, data);
  }
}
