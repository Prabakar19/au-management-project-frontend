import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Candidate } from 'src/app/datastructure/candidate';
import { CandidateService } from 'src/app/Services/candidate-service/candidate.service';

@Component({
  selector: 'app-candidate-register',
  templateUrl: './candidate-register.component.html',
  styleUrls: ['./candidate-register.component.css'],
})
export class CandidateRegisterComponent implements OnInit {
  hide: boolean;
  candidate: Partial<Candidate> = {};
  errorMessage: string = '';
  toggle: boolean = false;
  emailId: string = '';

  registrationForm = this.fb.group({
    candidateName: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z].*[\\s.]*$'),
      ],
    ],
    location: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z]+'),
      ],
    ],
    emailId: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private candidateService: CandidateService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addCandidate() {
    if (this.registrationForm.valid) {
      this.candidate = this.registrationForm.value;

      console.log(this.candidate);
      this.candidateService.addCandidateRequest(this.candidate).subscribe(
        (res) => {
          this.candidate = res;

          this.registrationForm.reset;
          localStorage.setItem('isCandidateLoggedIn', 'true');
          localStorage.setItem(
            'candidatetoken',
            JSON.stringify(this.candidate)
          );

          this.router.navigateByUrl('/candidatehome');
        },
        (error) => {
          this.errorMessage = 'customer already exist with these details';
        }
      );
    }
  }
}
