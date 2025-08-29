import { Seeker } from "./seeker";
import { Skill } from "./skill";

export interface SeekerSkill {
  id?: number;

  skill_id?: number;
  seeker_id?: number;
  proficiency_level: "beginner" | "intermediate" | "advanced";
is_certified: boolean;

  created_at: Date;

  seeker: Seeker;
skill: Skill;
}
