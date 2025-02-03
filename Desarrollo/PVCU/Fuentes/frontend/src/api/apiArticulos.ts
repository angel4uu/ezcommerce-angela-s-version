import { AxiosProtectedService, AxiosService } from './api';
import { Articulo, Catalogo, Usuario } from '@/types';

const baseURL = import.meta.env.VITE_API_URL;

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

