import { Usuario } from '@/types';
import axios from 'axios';

//Usuarios
export const baseURL='http://localhost:8000/usuarios';

const usuariosApi = axios.create({
  baseURL: `${baseURL}` 
});

export const createUsuario = (usuario:Usuario) => {
  return usuariosApi.post('/', usuario);
};

//Escuelas
export const baseURLEscuela='http://localhost:8000/escuelasprofesionales';

const escuelasApi = axios.create({
  baseURL: `${baseURLEscuela}` 
});
export const getEscuelas = () => {
  return escuelasApi.get('/');
}

