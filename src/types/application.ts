import { Seeker } from "./seeker";
import { Vacancy } from "./vacancy";

export enum ApplicationStatusType {
  PENDING = "pending",
  REVIEWED = "reviewed",
  SHORTLISTED = "shortlisted",
  INTERVIEW_SCHEDULED = "interview_scheduled",
  INTERVIEWED = "interviewed",
  TECHNICAL_TEST = "technical_test",
  REFERENCE_CHECK = "reference_check",
  OFFERED = "offered",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  WITHDRAWN = "withdrawn",
  EXPIRED = "expired",
}

export interface Application {
  id: number;

  cover_letter?: string;

  resume_file?: string;

  portfolio_url?: string;

  status: ApplicationStatusType;
  rejection_reason?: string;
  interview_date?: Date;

  interview_notes?: string;

  applied_at?: Date;

  reviewed_at?: Date;

  updated_at?: Date;
  //========================
  seeker: Seeker;

  vacancy: Vacancy;
}
