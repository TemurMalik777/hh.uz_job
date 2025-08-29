import { Application } from "./application";
import { SeekerSkill } from "./seeker-skill";

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BANNED = "banned",
}

export enum PreferredWorkForm {
  REMOTE = "remote",
  ONSITE = "onsite",
  HYBRID = "hybrid",
}

export interface Seeker {
  id?: number;

  first_name: string;

  last_name: string;

  email: string;

  password_hash: string;

  phone_number: string;

  birth_date: string;

  gender: Gender;

  address: string;

  city: string;

  country: string;
description: string;

  img_url: string;

  social_links_id: number;
  languages: any;
  resume_file: string;
  

  expected_salary_min: number;

  expected_salary_max: number;

  preferred_work_form: PreferredWorkForm;
  preferred_locations: any;
  status: Status;

  hashed_refresh_token: string;
  is_active: boolean;
  activate_link: string;
  created_at: Date;
  updated_at: Date;

  // @ApiProperty({
  //   type: () => [WorkExperience],
  //   description: "List of Job Seeker working experience",
  // })
  // @OneToMany(() => WorkExperience, (workExperience) => workExperience.seeker)
  // work_experiences: WorkExperience[];


  // @ApiProperty({
  //   type: () => [Education],
  //   description: "List of Job Seeker education",
  // })
  // @OneToMany(() => Education, (education) => education.seeker)
  // education: Education[];
  skill: SeekerSkill[];

  applications: Application[];


  //  @ApiProperty({
  //   type: () => [SeekerSocialLink],
  //   description: "List of seekerSocialLink",
  // })
  // @OneToMany(() => SeekerSocialLink, (seekerSocialLink) => seekerSocialLink.seeker)
  // seekerSocialLink: SeekerSocialLink[];
}
