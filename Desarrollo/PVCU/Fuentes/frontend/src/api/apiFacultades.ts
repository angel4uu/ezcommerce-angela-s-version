import { EscuelaProfesional } from '@/types';
import { AxiosService } from './api';
const baseURL = import.meta.env.VITE_API_URL;

class FacultadesService extends AxiosService {
  getFacultadesByPage = (page: number) => {
    return this.instance.get(`/?page=${page}`);
  };
}

export const facultadesService = new FacultadesService(`${baseURL}/facultades`);


class EscuelasService extends AxiosService {
  getEscuelas = async () => {
    const { data } = await this.instance.get('/');
    return data.results as EscuelaProfesional[];
  };
}
export const escuelasService = new EscuelasService(`${baseURL}/escuelasprofesionales/`);

// User activation api
class UserActivationService extends AxiosService {
  activateUser = (data:{uid: string, token: string}) => {
    return this.instance.post("/", data);
  };
}
export const userActivationService = new UserActivationService(`${baseURL}/activate-account/`);