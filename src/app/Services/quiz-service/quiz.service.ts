import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from 'src/app/datastructure/quiz';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  quizIdURL = '/api/quiz/id/';
  constructor(private http: HttpClient) {}

  updateQuizRequest(quiz: Quiz, id: number): Observable<Quiz> {
    return this.http.put<Quiz>(this.quizIdURL + id, quiz);
  }

  deleteQuizRequest(id: number): Observable<Quiz> {
    return this.http.delete<Quiz>(this.quizIdURL + id);
  }
}
