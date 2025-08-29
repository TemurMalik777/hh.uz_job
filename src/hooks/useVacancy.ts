"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { vacancyService } from "../service";
import { ParamsType, Vacancy } from "../types";

export const useVacancy = (params?: ParamsType) => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["vacancies", params],
    queryFn: async () => vacancyService.getVacancies(params!),
  });

  //Mutations
  const useVacancyCreate = () => {
    return useMutation({
      mutationFn: async (data: Vacancy) => vacancyService.createVacancy(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["vacancies"] });
      },
    });
  };

  const useVacancyUpdate = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: number; data: Vacancy }) =>
        vacancyService.updateVacancy(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["vacancies"] });
      },
    });
  };

  const useVacancyDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => vacancyService.deleteVacancy(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["vacancies"] });
      },
    });
  };
  return {
    data,
    useVacancyCreate,
    useVacancyUpdate,
    useVacancyDelete,
  };
};
