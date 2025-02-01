import { AxiosProtectedService} from './api';
const baseURL = import.meta.env.VITE_API_URL;
export interface Image {
  id:number,
  id_articulo: number,
  url: string,
}

class ImagesService extends AxiosProtectedService {
  getAllImages = async() => {
    const {data}=await this.instance.get('/');
    return data.results as Image[]; 
  };

  getImagesByArticulo = async (id: Image["id_articulo"]) => {
    const {data}= await this.instance.get(`/?id_articulo=${id}`);
    return data.results as Image[];
  };

  createImage = (image: Partial<Image>) => {
    return this.instance.post('/', image);
  };

  updateImage = (id: Image["id"], image: Partial<Image>) => {
    return this.instance.put(`/${id}/`, image);
  };

  deleteImage = (id: Image["id"]) => {
    return this.instance.delete(`/${id}/`);
  };
}

export const imagesService = new ImagesService(`${baseURL}/imagenes`);