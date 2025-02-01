import { AxiosProtectedService} from './api';
import { Usuario } from './apiUsuarios';
const baseURL = import.meta.env.VITE_API_URL;
export interface Articulo {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  etiquetas: number[];
  id_marca?: number;
  is_marca: boolean;
  id_catalogo: number;
  imageUrl?: string;
}

class ArticulosService extends AxiosProtectedService {
  getArticulos = async() => {
    const {data}= await this.instance.get('/');
    return data.results as Articulo[];
  };

  createArticulo = (articulo: Partial<Articulo>) => {
    return this.instance.post('/', articulo);
  };

  updateArticulo = (id: Articulo["id"], articulo: Partial<Articulo>) => {
    return this.instance.put(`/${id}/`, articulo);
  };

  deleteArticulo = (id: Articulo["id"]) => {
    return this.instance.delete(`/${id}/`);
  };

  getArticulo = async (id: Articulo["id"]) => {
    const {data}= await this.instance.get(`/${id}`);
    return data as Articulo;
  };

  getArticulosByUsuario = async(usuarioId: Usuario["id"]) => {
    const {data}=await this.instance.get(`/?id_catalogo__id_usuario=${usuarioId}`);
    return data.results as Articulo[];
  };
}

export const articulosService = new ArticulosService(`${baseURL}/articulos`);

