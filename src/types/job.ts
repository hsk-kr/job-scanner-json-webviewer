export interface IndeedJobInfo {
  jobTitle: string;
  companyName: string;
  url: string;
}

export interface LinkedinJobInfo {
  jobTitle: string;
  jobDescription: string;
  jobAdditionalInfo: string;
  url: string;
}

export type JobInfoUnion = IndeedJobInfo & LinkedinJobInfo;
