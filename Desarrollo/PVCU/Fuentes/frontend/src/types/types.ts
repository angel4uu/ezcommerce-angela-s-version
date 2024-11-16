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
export type APIResponse ={
  results: EscuelaProfesional[];               
}
