import { ApiUrls } from "../api/api-urls";
import { apiConfig } from "../api/config";
import { ParamsType, Vacancy } from "../types";

export const vacancyService = {
  async getVacancies(params: ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.VACANCIES, params);
    return res;
  },

  async getVacancyById(id: number) {
    const res = await apiConfig().getRequest(
      `${ApiUrls.VACANCIES}/${id}`);
    return res;
  },

  async createVacancy(model: Vacancy) {
    const res = await apiConfig().postRequest(ApiUrls.VACANCIES, model);
    return res;
  },

  async updateVacancy(id: number, model: Vacancy) {
    console.log(model);
    const res = await apiConfig().patchRequest(
      `${ApiUrls.VACANCIES}/${id}`,
      model
    );
    return res;
  },

  async deleteVacancy(id: number) {
    const res = await apiConfig().removeRequest(`${ApiUrls.VACANCIES}/${id}`);
    return res;
  },
};
