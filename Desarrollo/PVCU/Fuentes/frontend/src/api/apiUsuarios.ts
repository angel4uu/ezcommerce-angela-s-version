import { Usuario } from '@/types';
import { AxiosProtectedService} from './api';
const baseURL = import.meta.env.VITE_API_URL;
console.log(baseURL);

class UsuariosService extends AxiosProtectedService {
  createUsuario = (usuario: Partial<Usuario>) => {
    return this.instance.post('/', usuario);
  };

  getUsuario = async (userId: Usuario["id"]) => {
    const { data } = await this.instance.get(`/${userId}`);
    return data as Usuario;
  };
}
export const usuariosService = new UsuariosService(`${baseURL}/usuarios/`);



