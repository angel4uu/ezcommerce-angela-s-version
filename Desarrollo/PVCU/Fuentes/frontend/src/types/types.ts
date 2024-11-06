export type Marca={
  nombre:string,
  logo:string|undefined,
  descripcion:String,
  facebook:string|undefined,
  instagram:string|undefined,
  tiktok:string|undefined,
  otra_red_Social:string|undefined,
  activado:boolean
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