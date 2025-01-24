import { AxiosService, baseURL } from './api';

class CatalogosService extends AxiosService {
  getCatalogoUser = (id_usuario: number) => {
    return this.instance.get(`/?id_usuario=${id_usuario}`);
  };

  getCatalogoById = (id: number) => {
    return this.instance.get(`/${id}`);
  };
}

export const catalogosService = new CatalogosService(`${baseURL}/catalogos`);