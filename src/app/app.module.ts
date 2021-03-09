import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './Features/login-page/login-page.component';
import { HomePageComponent } from './Features/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material/app-material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationGuard } from './Guards/authentication.guard';
import { ErrorCardComponent } from './components/error-card/error-card.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { ExpansionCardComponent } from './components/expansion-card/expansion-card.component';
import { AssessmentScreenComponent } from './Features/assessment-screen/assessment-screen.component';
import { QuizCardComponent } from './components/quiz-card/quiz-card.component';
import { AssignmentCardComponent } from './components/assignment-card/assignment-card.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MyAssessmentsComponent } from './Features/my-assessments/my-assessments.component';
import { AddAssessmentComponent } from './Features/add-assessment/add-assessment.component';
import { SelectComponent } from './components/select/select.component';
import { AddQuizComponent } from './components/add-quiz/add-quiz.component';
import { AddAssignmentComponent } from './components/add-assignment/add-assignment.component';
import { AddProjectComponent } from './components/add-project/add-project.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    ErrorCardComponent,
    NavBarComponent,
    SearchBarComponent,
    ExpansionCardComponent,
    AssessmentScreenComponent,
    QuizCardComponent,
    AssignmentCardComponent,
    ProjectCardComponent,
    DialogComponent,
    MyAssessmentsComponent,
    AddAssessmentComponent,
    SelectComponent,
    AddQuizComponent,
    AddAssignmentComponent,
    AddProjectComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    NgxPaginationModule,
    Ng2OrderModule,
  ],
  providers: [AuthenticationGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
