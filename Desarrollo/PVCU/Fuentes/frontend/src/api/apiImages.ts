import { AxiosProtectedService} from './api';
const baseURL = import.meta.env.VITE_API_URL;
export interface Image {
  id_articulo: number,
  url: string,
}

class ImagesService extends AxiosProtectedService {
  getAllImages = () => {
    return this.instance.get('/');
  };

  getImage = (id: number) => {
    return this.instance.get(`/?id_articulo=${id}`);
  };

  createImage = (image: Image) => {
    return this.instance.post('/', image);
  };

  updateImage = (id: number, image: Image) => {
    return this.instance.put(`/${id}/`, image);
  };

  deleteImage = (id: number) => {
    return this.instance.delete(`/${id}/`);
  };
}

export const imagesService = new ImagesService(`${baseURL}/imagenes`);