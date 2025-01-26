import { AxiosService, baseURL } from './api';

export interface Facultad{
  codigo:number,
  nombre:string,
  siglas:string,
}

class FacultadesService extends AxiosService {
  getAllFacultades = (page: number) => {
    return this.instance.get(`/?page=${page}`);
  };
}

export const facultadesService = new FacultadesService(`${baseURL}/facultades`);