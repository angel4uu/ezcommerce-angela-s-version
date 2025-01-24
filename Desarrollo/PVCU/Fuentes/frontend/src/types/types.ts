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

export type EscuelaProfesional={
  id?:string,
  id_facultad:string,
  codigo:string,
  nombre:string,
}

export type Marca={
  id?:number,
  id_usuario:number,
  nombre:string,
  descripcion:string,
  logo:string|FileList
}
export type Plan={
  id?:number,
  nombre:string,
  descripcion:string,
  espacio_extra:number,
  duracion:number,
  precio:number,
  beneficios?:string[],
}
export type Membresia={
  id?:number,
  id_marca:number,
  id_plan:number,
  fecha_inicio:string,
  fecha_final:string,
}

export type DecodedToken ={
  user_id: number;
}
export type AuthState ={
  accessToken: string | null;
  userId: number | null;
}
export type APIResponse ={
  results: EscuelaProfesional[];               
}

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

export interface Etiqueta{
  id:number,
  nombre:string,
  descripcion:string,
}

export interface Facultad{
  codigo:number,
  nombre:string,
  siglas:string,
}

export interface Image {
  id_articulo: number,
  url: string,
}
