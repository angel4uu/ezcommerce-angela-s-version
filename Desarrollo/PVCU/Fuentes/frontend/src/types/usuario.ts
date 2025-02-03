export type Usuario = {
  id: number,
  id_escuela: number,
  username: string,
  email: string,
  nombres: string,
  apellido_p: string,
  apellido_m: string,
  celular: string,
  codigo: string,
  fecha_nacimiento: string,
  codigo_qr: string | FileList | null,
  tiene_marca: boolean,
}