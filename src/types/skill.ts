import { SeekerSkill } from "./seeker-skill";
import { Specialization } from "./specialization";

export enum SkillType {
  TECHNICAL = "Technical",
  SOFT = "Soft",
  OTHER = "Other",
  LANGUAGE = "Language",
  CERTIFICATION = "Certification",
}

export interface Skill {
  id?: number;

  name: string;

  description?: string;

  skill_type: SkillType;

  is_active: boolean;

  updated_at: Date;
created_at: Date;

  specialization: Specialization;

  // @ApiProperty({
  //   type: () => [VacancySkill],
  //   description: 'Required Skill of Vacancies',
  // })
  // @OneToMany(() => VacancySkill, (vacancySkill) => vacancySkill.skill, {
  //   onDelete: "CASCADE",
  // })
  // vacancySkills: VacancySkill[];

  seekerSkill: SeekerSkill[];
}
