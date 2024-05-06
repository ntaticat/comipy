export interface IDocente {
  docente_id: number;
  nombre_completo: string;
  nombres: string;
  primer_apellido: string;
  segundo_apellido: string;
  usuario: string;
  email: string;
  password: string;
  activo: boolean;
}

export interface IAlumno {
  alumno_id: number;
  nombre_completo: string;
  nombres: string;
  primer_apellido: string;
  segundo_apellido: string;
  turno_id: number;
  folio: string;
  activo: boolean;
}
