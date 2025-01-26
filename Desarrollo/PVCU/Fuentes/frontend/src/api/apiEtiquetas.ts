import { AxiosService, baseURL } from './api';

export interface Etiqueta{
  id:number,
  nombre:string,
  descripcion:string,
}

class EtiquetasService extends AxiosService {
  getEtiquetas = () => {
    return this.instance.get('/');
  };
}

export const etiquetasService = new EtiquetasService(`${baseURL}/etiquetas`);