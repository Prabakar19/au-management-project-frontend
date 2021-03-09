export interface Project {
  projectId: number;
  title: string;
  description: string;
  buildScore: number;
  processScore: number;
  testingScore: number;
  totalScore: number;
  assessmentId: number;
}
