import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Candidate } from 'src/app/datastructure/candidate';
import { CandidateService } from 'src/app/Services/candidate-service/candidate.service';

@Component({
  selector: 'app-candidate-login',
  templateUrl: './candidate-login.component.html',
  styleUrls: ['./candidate-login.component.css'],
})
export class CandidateLoginComponent implements OnInit {
  errorMessage: string = '';
  hide: boolean;
  candidate: Partial<Candidate> = {};

  loginForm = this.fb.group({
    emailId: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  auth2: any;

  constructor(
    private candidateService: CandidateService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      this.candidateService.loginRequest(this.loginForm.value).subscribe(
        (res) => {
          this.candidate = res;
          this.loginForm.reset;
          localStorage.setItem('isCandidateLoggedIn', 'true');
          localStorage.setItem(
            'candidatetoken',
            JSON.stringify(this.candidate)
          );
          console.log(this.candidate);
          this.router.navigateByUrl('/candidatehome');
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
