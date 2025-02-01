import { AxiosProtectedService, AxiosService } from "./api";
const baseURL = import.meta.env.VITE_API_URL;
// Marcas
export type Marca={
  id?:number,
  id_usuario:number,
  nombre:string,
  descripcion:string,
  logo:string|FileList
}

class MarcasService extends AxiosProtectedService {
  getMarcaByUsuario = async (idUsuario: Marca["id_usuario"]) => {
    const {data}= await this.instance.get(`/?id_usuario=${idUsuario}`);
    return data.results[0] as Marca;
  };

  createMarca = (marca: Partial<Marca>) => {
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
  getMembresiaByMarca = async (idMarca:Membresia["id_marca"]) => {
    const {data}=await this.instance.get(`/?id_marca=${idMarca}`);
    return data.results[0] as Membresia;
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
  getPlan = async (planId: Plan["id"]) => {
    const {data}= await this.instance.get(`${planId}`);
    return data as Plan;
  };

  getPlanes = async() => {
    const{data}=await this.instance.get("/");
    return data.results as Plan[];
  };
}
export const planesService = new PlanesService(`${baseURL}/planes/`);


