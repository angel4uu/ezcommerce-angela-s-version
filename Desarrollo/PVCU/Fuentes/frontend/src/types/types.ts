export type Marca={
  nombre:string,
  logo?:string|FileList|null,
  descripcion:string,
  facebook?:string,
  instagram?:string,
  tiktok?:string,
  otra_red_social?:string,
  activado:boolean
}
export type Plan={
  tipo: string,
  duracion: string,
  precio: number,
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