import { AxiosService, baseURL } from './api';

class EtiquetasService extends AxiosService {
  getEtiquetas = () => {
    return this.instance.get('/');
  };
}

export const etiquetasService = new EtiquetasService(`${baseURL}/etiquetas`);