import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Quiz } from 'src/app/datastructure/quiz';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.css'],
})
export class QuizCardComponent implements OnInit {
  toggle: boolean = true;

  @Input('quiz')
  quiz: Quiz;

  @Output()
  updatedQuiz: EventEmitter<Quiz> = new EventEmitter();

  @Output()
  removeItem: EventEmitter<number> = new EventEmitter();

  updationForm = this.fb.group({
    question: ['', [Validators.required]],
    option1: ['', [Validators.required]],
    option2: ['', [Validators.required]],
    option3: ['', [Validators.required]],
    option4: ['', [Validators.required]],
    answer: ['', [Validators.required]],
    score: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  setDefault() {
    this.updationForm.setValue({
      question: this.quiz.question,
      option1: this.quiz.option1,
      option2: this.quiz.option2,
      option3: this.quiz.option3,
      option4: this.quiz.option4,
      answer: this.quiz.answer,
      score: this.quiz.score,
    });
  }
  enableEdit() {
    this.toggle = !this.toggle;
    this.setDefault();
  }

  saveQuiz() {
    if (this.updationForm.valid) {
      console.log(this.quiz);

      this.quiz.question = this.updationForm.controls['question'].value;
      this.quiz.option1 = this.updationForm.controls['option1'].value;
      this.quiz.option2 = this.updationForm.controls['option2'].value;
      this.quiz.option3 = this.updationForm.controls['option3'].value;
      this.quiz.option4 = this.updationForm.controls['option4'].value;
      this.quiz.answer = this.updationForm.controls['answer'].value;
      this.quiz.score = this.updationForm.controls['score'].value;

      this.updatedQuiz.emit(this.quiz);
      this.toggle = !this.toggle;
    }
  }

  removeQuiz() {
    this.removeItem.emit(this.quiz.quizId);
  }
}
