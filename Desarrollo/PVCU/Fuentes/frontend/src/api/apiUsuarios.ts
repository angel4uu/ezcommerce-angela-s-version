import {Usuario } from '@/types';
import axios from 'axios';
import { baseURL } from './api';

//Usuarios
export const usuariosApi = axios.create({
  baseURL: `${baseURL}/usuarios/` 
});

export const createUsuario = (usuario:Usuario) => {
  return usuariosApi.post('/', usuario);
};


//Escuelas
const escuelasApi = axios.create({
  baseURL: `${baseURL}/escuelasprofesionales/` 
});
export const getEscuelas = () => {
  return escuelasApi.get('/');
}

