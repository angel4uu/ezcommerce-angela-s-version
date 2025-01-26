import { AxiosProtectedService, baseURL, AxiosService } from './api';

// Usuarios
export type Usuario={
  id?:number,
  id_escuela:number,
  username:string,
  email:string,
  nombres:string,
  apellido_p:string,
  apellido_m:string,
  celular:string,
  codigo:string,
  fecha_nacimiento?:string,
  codigo_qr?:string|FileList|null,
}

class UsuariosService extends AxiosProtectedService {
  createUsuario = (usuario: Usuario) => {
    return this.instance.post('/', usuario);
  };

  getUsuarios = (userId: number, access_token: string | null) => {
    this.access_token = access_token;
    return this.instance.get(`/${userId}`);
  };
}
export const usuariosService = new UsuariosService(`${baseURL}/usuarios/`);

// Escuelas
export type EscuelaProfesional={
  id?:string,
  id_facultad:string,
  codigo:string,
  nombre:string,
}

class EscuelasService extends AxiosService {
  getEscuelas = () => {
    return this.instance.get('/');
  };
}
export const escuelasService = new EscuelasService(`${baseURL}/escuelasprofesionales/`);


