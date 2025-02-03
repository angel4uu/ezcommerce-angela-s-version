export interface Facultad{
  codigo:number,
  nombre:string,
  siglas:string,
}

export type EscuelaProfesional = {
  id?: string,
  id_facultad: string,
  codigo: string,
  nombre: string,
}