import { AxiosService } from './api';
const baseURL = import.meta.env.VITE_API_URL;
class CatalogosService extends AxiosService {
  getCatalogoUser = (id_usuario: number) => {
    return this.instance.get(`/?id_usuario=${id_usuario}`);
  };

  getCatalogoById = (id: number) => {
    return this.instance.get(`/${id}`);
  };
}

export const catalogosService = new CatalogosService(`${baseURL}/catalogos`);