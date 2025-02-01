import { AxiosService } from './api';
const baseURL = import.meta.env.VITE_API_URL;
export type Catalogo = {
    id: number;
    id_usuario: number;
    id_marca: number | null;
    capacidad_maxima: number;
    espacio_ocupado: number;
  }
class CatalogosService extends AxiosService {
  getCatalogoByUser = async (id_usuario: Catalogo["id_usuario"]) => {
    const {data}= await this.instance.get(`/?id_usuario=${id_usuario}`);
    return data.results as Catalogo[];
  };

  getCatalogo = async (id: Catalogo["id"]) => {
    const {data}=await this.instance.get(`/${id}`);
    return data as Catalogo;
  };
}

export const catalogosService = new CatalogosService(`${baseURL}/catalogos`);