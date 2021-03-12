import { Assessment } from './assessment';

export interface Course {
  courseId: number;
  courseName: string;
  courseDescription: string;
  skill: string;
  preRequisite: string;
  managerId: number;
  assessments: Assessment[];
  candidateCourseSet: Object[];
}
