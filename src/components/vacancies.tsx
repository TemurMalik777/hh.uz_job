"use client"
import { useVacancy } from "../hooks";
import VacancyCard from "./vacancyCard";

const Vacancies = () => {
  const { data } = useVacancy({ page: 1, limit: 10 });
  console.log("vacancy", data);
  return (
    <div>
      <h1>Vacancies</h1>
      <VacancyCard vacancies={data?.data?.data} />
    </div>
  );
};

export default Vacancies;
