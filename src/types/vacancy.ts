import { Application } from "./application";
import { Hr } from "./hr";
import { Specialization } from "./specialization";
import { VacancySkill } from "./vacancy_skill";

export enum WorkScheduleType {
  "6_1" = "6_1",
  "5_2" = "5_2",
  "4_4" = "4_4",
  "4_3" = "4_3",
  "4_2" = "4_2",
  "3_3" = "3_3",
  "3_2" = "3_2",
  "2_2" = "2_2",
  "2_1" = "2_1",
  "1_3" = "1_3",
  "1_2" = "1_2",
  WEEKENDS_ONLY = "weekends_only",
  FLEXIBLE = "flexible",
  SHIFT_WORK = "shift_work",
  OTHER = "other",
}

export enum WorkFormatType {
  ON_SITE = "on_site",
  REMOTE = "remote",
  HYBRID = "hybrid",
  FIELD_BASED = "field_based",
}

export enum RequiredExperienceType {
  NO_EXPERIENCE = "no_experience",
  "1_to_3_YEARS" = "1_to_3_years",
  "3_to_6_YEARS" = "3_to_6_years",
  MORE_HTAN_6_YEARS = "more_than_6_years",
}

export enum RequiredEducationType {
  NO_REQUIREMENT = "no_requirement",
  HIGH_SCHOOL = "high_school",
  VOCATIONAL = "vocational",
  BACHELOR = "bachelor",
  MASTER = "master",
  PHD = "phd",
}

export enum StatusType {
  DRAFT = "draft",
  ACTIVE = "active",
  PAUSED = "paused",
  CLOSED = "closed",
  EXPIRED = "expired",
}

export enum PriorityType {
  NORMAL = "normal",
  FEATURED = "featured",
  URGENT = "urgent",
}

export enum EmploymentType{
 FULL_TIME= "full_time",PART_TIME='part_time',
 CONTRACT="contract",INTERNSHIP='internship',TEMPORARY="temporary"
}

export interface Vacancy {
  id: number;

  title: string;

  description: string;
  requirements: string;
  responsibilities?: string;
  address?: string;
  salaryFrom?: number;
  salaryTo?: number;
  salaryCurrency?: string;
  isSalaryNegotiable?: boolean;
  workFormat: WorkFormatType;
  workSchedule: WorkScheduleType;
  workHoursPerWeek?: number;
  employmentType?: EmploymentType;
  experienceRequired: RequiredExperienceType;
  educationRequired?: RequiredEducationType;
  positionsAvailable?: number;
  applicationDeadline?: Date;
  contactEmail?: string;
  contactPhone?: string;
  status?: StatusType;
  priority?: PriorityType;
  views_count?: number;
  applications_count?: number;
  hrId: number
  companyId: number
  specializationId: number
  published_at?: Date;
  expires_at?: Date;
  created_at?: Date;

  updated_at?: Date;
  hr: Hr;

  // @ApiProperty({
  //   type: () => Company,
  //   description: "Company info",
  //   example: "1",
  // })
  // @ManyToOne(() => Company, (hr) => hr.vacansy)
  // company: Company;

  specialization: Specialization;

  applications: Application[];
  vacancySkills: VacancySkill[];
}

export interface Vacancies {
  vacancies:Vacancy[]
}