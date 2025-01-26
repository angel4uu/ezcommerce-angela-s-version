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
  getArticulos = () => {
    return this.instance.get('/');
  };

  createArticulo = (articulo: Articulo) => {
    return this.instance.post('/', articulo);
  };

  updateArticulo = (id: number, articulo: Articulo) => {
    return this.instance.put(`/${id}/`, articulo);
  };

  deleteArticulo = (id: number) => {
    return this.instance.delete(`/${id}/`);
  };

  getArticulo = (id: number) => {
    return this.instance.get(`/${id}`);
  };

  getArticulosByUsuario = (usuarioId: number) => {
    return this.instance.get(`/?id_catalogo__id_usuario=${usuarioId}`);
  };
}

export const articulosService = new ArticulosService(`${baseURL}/articulos`);

