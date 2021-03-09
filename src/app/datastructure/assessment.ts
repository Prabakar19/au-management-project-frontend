import { Assignment } from './assignment';
import { Project } from './project';
import { Quiz } from './quiz';

export interface Assessment {
  assessmentId: number;
  assessmentTitle: string;
  description: string;
  type: string;
  score: number;
  courseId: number;
  managerId: number;
  lastUpdated: Date;
  quizSet: Quiz[];
  assignmentSet: Assignment[];
  projectSet: Project[];
}
