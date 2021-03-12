import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from 'src/app/datastructure/candidate';
import { CandidateAssessment } from 'src/app/datastructure/candidate-assessment';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  candidateURL = '/api/candidate';
  loginURL = '/login';
  candidateAssessURL = '/api/candidateassess';
  constructor(private http: HttpClient) {}

  addCandidateRequest(candidate: Partial<Candidate>): Observable<Candidate> {
    return this.http.post<Candidate>(this.candidateURL, candidate);
  }

  loginRequest(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(
      this.candidateURL + this.loginURL,
      candidate
    );
  }

  addCandidateScoreRequest(
    candidateAssessment: Partial<CandidateAssessment>
  ): Observable<CandidateAssessment> {
    return this.http.post<CandidateAssessment>(
      this.candidateAssessURL,
      candidateAssessment
    );
  }
}
