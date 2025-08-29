import { Vacancy } from "./vacancy";

export interface Specialization {
  id?: number;

  name: string;
  description?: string;

  active_vacancies_count: number;
  is_active: boolean;

  created_at: Date;
  updated_at: Date;

  // @ApiProperty({
  //   type: () => Category,
  //   description: "Category info",
  //   example: "1",
  // })
  // @ManyToOne(() => Category, (category) => category.specialization, {
  //   onDelete: "CASCADE",
  // })
  // category: Category;

  // @ApiProperty({
  //   type: () => [Skill],
  //   description: "Skills of Specialization",
  // })
  // @OneToMany(() => Skill, (skill) => skill.specialization)
  // skill: Skill[];

  // @ApiProperty({
  //   type: () => [Education],
  //   description: "Educations of Specialization",
  // })
  // @OneToMany(() => Education, (education) => education.specialization, {
  //   onDelete: "CASCADE",
  // })
  // education: Education[];

  vacancy: Vacancy[];

  // @ApiProperty({
  //   type: () => [WorkExperience],
  //   description: "Work Experience of Specialization",
  // })
  // @OneToMany(
  //   () => WorkExperience,
  //   (workExperience) => workExperience.specialization
  // )
  // workExperience: WorkExperience[];
}
