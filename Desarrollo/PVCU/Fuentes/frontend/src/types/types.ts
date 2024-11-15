export type Marca={
  id:string,
  nombre:string,
  logo?:string|FileList|null,
  descripcion:string,
  facebook?:string,
  instagram?:string,
  tiktok?:string,
  otra_red_social?:string,
  activado:boolean,
}
export type Plan={
  id:string,
  descripcion:string,
  precio: number,
  duracion_meses: number|null,
  productos_adicionales:number|null,
  tipo?:string,
  beneficios?:string[],
}
export type Suscripcion={
  id:string,
  marca:string,
  plan:string,
  fecha_vencimiento:string|null,
}

export type DecodedToken ={
  user_id: number;
}
export type Tokens ={
  access: string;
  refresh: string;
}
export type AuthState ={
  accessToken: string | null;
  userId: number | null;
}