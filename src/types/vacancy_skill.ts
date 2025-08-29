import { Skill } from "./skill";
import { Vacancy } from "./vacancy";

export enum ProficiencyLevelType {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
  EXPERT = "expert",
}

export enum PriorityType {
  MUST_HAVE = "must_have",
  NICE_TO_HAVE = "nice_to_have",
}

export interface VacancySkill {
  id: number;
 isRequired: boolean;

  proficiencyLevel?: ProficiencyLevelType;

  priority?: PriorityType;
  vacancy: Vacancy;
 skill: Skill;
}
