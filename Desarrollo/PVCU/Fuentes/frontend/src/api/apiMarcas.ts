import { baseURL, AxiosProtectedService, AxiosService } from "./api";

// Marcas
export type Marca={
  id?:number,
  id_usuario:number,
  nombre:string,
  descripcion:string,
  logo:string|FileList
}

class MarcasService extends AxiosProtectedService {
  getMarcaByUsuario = (idUsuario: number | null) => {
    return this.instance.get(`/?id_usuario=${idUsuario}`);
  };

  createMarca = (marca: Marca) => {
    return this.instance.post("/", marca);
  };
}
export const marcasService = new MarcasService(`${baseURL}/marcas/`);

// Membresias
export type Membresia={
  id?:number,
  id_marca:number,
  id_plan:number,
  fecha_inicio:string,
  fecha_final:string,
}

class MembresiasService extends AxiosService {
  getMembresiaByMarca = (idMarca: number) => {
    return this.instance.get(`/?id_marca=${idMarca}`);
  };
}
export const membresiasService = new MembresiasService(`${baseURL}/membresias/`);

// Planes
export type Plan={
  id?:number,
  nombre:string,
  descripcion:string,
  espacio_extra:number,
  duracion:number,
  precio:number,
  beneficios?:string[],
}

class PlanesService extends AxiosService {
  getPlan = async (planId: number) => {
    return await this.instance.get(`${planId}`);
  };

  getPlanes = () => {
    return this.instance.get("/");
  };
}
export const planesService = new PlanesService(`${baseURL}/planes/`);


