import { Etiqueta } from '@/types';
import { AxiosService} from './api';
const baseURL = import.meta.env.VITE_API_URL;

class EtiquetasService extends AxiosService {
  getEtiquetas = async () => {
    const {data}=await this.instance.get('/');
    return data.results as Etiqueta[];
  };
}

export const etiquetasService = new EtiquetasService(`${baseURL}/etiquetas`);