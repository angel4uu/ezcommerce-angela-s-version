import { Usuario } from '@/types';
import axios from 'axios';

//Usuarios
export const baseURL='http://localhost:8000/usuarios';

const usuariosApi = axios.create({
  baseURL: `${baseURL}` 
});

const usuariosApiToken = axios.create({
  baseURL: `${baseURL}` 
});

// Interceptor para agregar el token de acceso a las solicitudes
usuariosApiToken.interceptors.request.use((config) => {
  const tokens = JSON.parse(localStorage.getItem("tokens") || "{}");
  const accessToken = tokens?.access || null;
  
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    console.log("No access token found");
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const createUsuario = (usuario:Usuario) => {
  return usuariosApi.post('/', usuario);
};

export const getUsuarios = (userId:number) => {
  return usuariosApiToken.get(`/${userId}`);
}


//Escuelas
export const baseURLEscuela='http://localhost:8000/escuelasprofesionales';

const escuelasApi = axios.create({
  baseURL: `${baseURLEscuela}` 
});
export const getEscuelas = () => {
  return escuelasApi.get('/');
}

