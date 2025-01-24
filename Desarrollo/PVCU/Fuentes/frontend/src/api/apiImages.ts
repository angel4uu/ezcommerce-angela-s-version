import { AxiosProtectedService, baseURL } from './api';
import { Image } from '../types/types';

class ImagesService extends AxiosProtectedService {
  getAllImages = (access_token: string | null) => {
    this.access_token = access_token;
    return this.instance.get('/');
  };

  getImage = (id: number, access_token: string | null) => {
    this.access_token = access_token;
    return this.instance.get(`/?id_articulo=${id}`);
  };

  createImage = (image: Image, access_token: string | null) => {
    this.access_token = access_token;
    return this.instance.post('/', image);
  };

  updateImage = (id: number, image: Image, access_token: string | null) => {
    this.access_token = access_token;
    return this.instance.put(`/${id}/`, image);
  };

  deleteImage = (id: number, access_token: string | null) => {
    this.access_token = access_token;
    return this.instance.delete(`/${id}/`);
  };
}

export const imagesService = new ImagesService(`${baseURL}/imagenes`);