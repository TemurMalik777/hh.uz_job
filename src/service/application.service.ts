import { ApiUrls } from "../api/api-urls";
import { apiConfig } from "../api/config";
import { ParamsType} from "../types";
import { Application } from "../types/application";

export const applicationService = {
  async getApplications(params: ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.APPLICATIONS, params);
    return res;
  },

  async getApplicationStudents(params: ParamsType, id: number) {
    const res = await apiConfig().getRequest(
      `${ApiUrls.APPLICATIONS}/${id}`,
      params
    );
    return res;
  },

  async createApplication(model: Application) {
    const res = await apiConfig().postRequest(ApiUrls.APPLICATIONS, model);
    return res;
  },

  async updateApplication(id: number, model: Application) {
    console.log(model);
    const res = await apiConfig().patchRequest(
      `${ApiUrls.APPLICATIONS}/${id}`,
      model
    );
    return res;
  },

  async deleteApplication(id: number) {
    const res = await apiConfig().removeRequest(`${ApiUrls.APPLICATIONS}/${id}`);
    return res;
  },
};
