import axios from 'axios';
export const baseURL='http://localhost:8000/articulos';

export interface Articulo{
  nombre:string,
  descripcion:string,
  precio:number,
  stock:number,
  categoria:number
}


const articulosApi = axios.create({
  baseURL: `${baseURL}` 
});

export const getArticulos = () => {
    return articulosApi.get('/');
}

export const createArticulo = (articulo:Articulo) => {
  return articulosApi.post('/', articulo);
};

export const updateArticulo = (id:number, articulo:Articulo) => {
    return articulosApi.put(`/${id}`, articulo);
}

export const deleteArticulo = (id:number) => {
  return articulosApi.delete(`/${id}`);
};

export const getArticulo = (id:number) => {
    return articulosApi.get(`/${id}`);
}

export const getArticulosByUsuario = (usuarioId: number) => {
    return articulosApi.get(`/?id_catalogo__id_usuario=${usuarioId}`);
};