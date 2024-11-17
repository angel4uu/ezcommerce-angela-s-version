import axios from "axios";
export const baseURL = "http://localhost:8000";

//Marcas
const marcasApi = axios.create({
  baseURL: `${baseURL}/marcas`,
});

export const getMarcaByUsuario = (idUsuario: number | null) => {
  return marcasApi.get(`/?id_usuario=${idUsuario}`);
};

//Membresia
const membresiaApi = axios.create({
  baseURL: `${baseURL}/membresias`,
});

export const getMembresiaByMarca = (idMarca: number) => {
  return membresiaApi.get(`/?id_marca=${idMarca}`);
};

//Plan
const planesApi = axios.create({
  baseURL: `${baseURL}/planes`,
});

export const getPlan = async (planId: number) => {
  return await planesApi.get(`${planId}`);
};
export const getPlanes = () => {
  return planesApi.get("/");
};
