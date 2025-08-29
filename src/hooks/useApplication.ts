"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ParamsType } from "../types";
import { Application } from "../types/application";
import { applicationService } from "../service/application.service";

export const useApplication = (params?: ParamsType) => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["applications", params],
    queryFn: async () => applicationService.getApplications(params!),
  });

  //Mutations
  const useApplicationCreate = () => {
    return useMutation({
      mutationFn: async (data: Application) =>
        applicationService.createApplication(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["applications"] });
      },
    });
  };

  const useApplicationUpdate = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: number; data: Application }) =>
        applicationService.updateApplication(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["applications"] });
      },
    });
  };

  const useApplicationDelete = () => {
    return useMutation({
      mutationFn: async (id: number) =>
        applicationService.deleteApplication(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["applications"] });
      },
    });
  };
  return {
    data,
    useApplicationCreate,
    useApplicationUpdate,
    useApplicationDelete,
  };
};
