import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorCardComponent } from './components/error-card/error-card.component';
import { AddAssessmentComponent } from './Features/add-assessment/add-assessment.component';
import { AssessmentScreenComponent } from './Features/assessment-screen/assessment-screen.component';
import { CandidateHomeComponent } from './Features/candidate-home/candidate-home.component';
import { CandidateLoginComponent } from './Features/candidate-login/candidate-login.component';
import { CandidateRegisterComponent } from './Features/candidate-register/candidate-register.component';
import { HomePageComponent } from './Features/home-page/home-page.component';
import { LoginPageComponent } from './Features/login-page/login-page.component';
import { MyAssessmentsComponent } from './Features/my-assessments/my-assessments.component';
import { CandidateGuardGuard } from './Guards/candidate-guard/candidate-guard.guard';
import { AuthenticationGuard } from './Guards/manager-guard/authentication.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'candidatelogin',
    component: CandidateLoginComponent,
  },
  {
    path: 'candidateregister',
    component: CandidateRegisterComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'assessment',
    component: AssessmentScreenComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'myassessment',
    component: MyAssessmentsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'addassessment',
    component: AddAssessmentComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'candidatehome',
    component: CandidateHomeComponent,
    canActivate: [CandidateGuardGuard],
  },
  { path: '404', component: ErrorCardComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
