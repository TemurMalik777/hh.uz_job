import { Vacancy } from "./vacancy";

export enum HrRole {
  Hr = 'hr',
  Recruiter = 'recruiter',
  Manager = 'manager',
  Owner = 'owner',
}

export interface Hr {
  id: number;

  first_name: string;

  last_name: string;
 email: string;
   password_hash: string;

  phone_number: string;

 position: string;
  department: string;

  description: string;

  img_url: string;

  companyId: number;

  role: string;
  hashed_refresh_token: string;

  is_active: boolean;

  created_at: Date;
  updated_at: Date;
  active_link: string;

  // @ManyToOne(() => Company, (company) => company.hr)
  // company: Company;

  vacancy: Vacancy[];
}
