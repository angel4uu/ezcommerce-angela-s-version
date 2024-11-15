import axios from 'axios';
export const baseURL='http://localhost:8000/etiquetas';

interface Etiqueta{
    nombre:string,
    descripcion:string,
}

const etiquetasApi = axios.create({
    baseURL: `${baseURL}` 
});

export const getEtiquetas = () => {
    return etiquetasApi.get('/');
}