import { Marca,Membresia,Plan } from "@/types";
import { AxiosProtectedService, AxiosService } from "./api";
const baseURL = import.meta.env.VITE_API_URL;

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

class MembresiasService extends AxiosService {
  getMembresiaByMarca = async (idMarca:Membresia["id_marca"]) => {
    const {data}=await this.instance.get(`/?id_marca=${idMarca}`);
    return data.results[0] as Membresia;
  };
}
export const membresiasService = new MembresiasService(`${baseURL}/membresias/`);

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


