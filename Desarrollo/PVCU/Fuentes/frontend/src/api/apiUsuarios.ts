import { Usuario } from '@/types';
import { AxiosProtectedService, baseURL, AxiosService } from './api';

// Usuarios
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
class EscuelasService extends AxiosService {
  getEscuelas = () => {
    return this.instance.get('/');
  };
}
export const escuelasService = new EscuelasService(`${baseURL}/escuelasprofesionales/`);


