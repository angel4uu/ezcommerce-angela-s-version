import { AxiosProtectedService, baseURL } from './api';
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
  getArticulos = (access_token: string | null) => {
    this.access_token = access_token;
    return this.instance.get('/');
  };

  createArticulo = (articulo: Articulo, access_token: string | null) => {
    this.access_token = access_token;
    return this.instance.post('/', articulo);
  };

  updateArticulo = (id: number, articulo: Articulo, access_token: string | null) => {
    this.access_token = access_token;
    return this.instance.put(`/${id}/`, articulo);
  };

  deleteArticulo = (id: number, access_token: string | null) => {
    this.access_token = access_token;
    return this.instance.delete(`/${id}/`);
  };

  getArticulo = (id: number, access_token: string | null) => {
    this.access_token = access_token;
    return this.instance.get(`/${id}`);
  };

  getArticulosByUsuario = (usuarioId: number, access_token: string | null) => {
    this.access_token = access_token;
    return this.instance.get(`/?id_catalogo__id_usuario=${usuarioId}`);
  };
}

export const articulosService = new ArticulosService(`${baseURL}/articulos`);

