import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor() {}

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');

    localStorage.removeItem('usertoken');
  }

  candidatelogout(): void {
    localStorage.setItem('isCandidateLoggedIn', 'false');

    localStorage.removeItem('candidatetoken');
  }
}
