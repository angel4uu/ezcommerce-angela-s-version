import { AxiosService, baseURL } from './api';

class FacultadesService extends AxiosService {
  getAllFacultades = (page: number) => {
    return this.instance.get(`/?page=${page}`);
  };
}

export const facultadesService = new FacultadesService(`${baseURL}/facultades`);