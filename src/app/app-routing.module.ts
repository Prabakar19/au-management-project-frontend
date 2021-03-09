import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAssessmentComponent } from './Features/add-assessment/add-assessment.component';
import { AssessmentScreenComponent } from './Features/assessment-screen/assessment-screen.component';
import { HomePageComponent } from './Features/home-page/home-page.component';
import { LoginPageComponent } from './Features/login-page/login-page.component';
import { MyAssessmentsComponent } from './Features/my-assessments/my-assessments.component';
import { AuthenticationGuard } from './Guards/authentication.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
