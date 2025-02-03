export interface Articulo {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  etiquetas: number[];
  id_marca?: number;
  is_marca: boolean;
  id_catalogo: number;
  imageUrl?: string;
}

export type Catalogo = {
  id: number;
  id_usuario: number;
  id_marca: number | null;
  capacidad_maxima: number;
  espacio_ocupado: number;
};
