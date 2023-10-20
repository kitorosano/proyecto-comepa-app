enum TipoUsuario {
  NORMAL,
  ADMIN,
}

export type Usuario = {
  idusuario: number;
  codigoRrhh: string;
  nombreCompleto: string;
  nickname: string;
  email: string;
  activo: boolean;
  authKey: string;
  tipo_usuario: TipoUsuario;
};

export type Cita = {
  idCita: number;
  idTecnica: number;
  idFisioterapeuta: number;
  idOrdenServicio: number;
  idDisponibilidad: number;
  fecha: string; // 'yyyy-MM-dd'
  dia: number;
  hora: string; // 'hh:mm:ss'
  estaReservado: boolean;
  turno: number;
  lugar: string;
  duracion: string; // 'hh:mm:ss'
  cantidadPersonas: number;
  vigente: boolean;
  tipoCoordinacion: 1;
};

export type Direccion = {
  idDireccion: number;
  pais: string;
  departamento: string;
  calle: string;
  numero: string;
  ciudad: string;
};

export type PacienteConDirecciones = {
  idPaciente: number;
  cedula: string;
  nombreCompleto: string;
  correo: string;
  telefono: string;
  historialClinico: string;
  direcciones: Direccion[];
};

export enum OrdenRealizado {
  PENDIENTE,
  REALIZADA,
  NO_REALIZADA,
  FALTO,
  ANULADA,
}

export const OrderRealizadoValues = {
  [OrdenRealizado.PENDIENTE]: 'Pendiente',
  [OrdenRealizado.REALIZADA]: 'Realizada',
  [OrdenRealizado.NO_REALIZADA]: 'No Realizada',
  [OrdenRealizado.FALTO]: 'Faltó',
  [OrdenRealizado.ANULADA]: 'Anulada',
};

export type Fisioterapeuta = {
  idFisioterapeuta: number;
  nombreCompleto: string;
  idTerapia: string | null;
  codigoRrhh: string;
};

export type OrdenServicio = {
  idOrdenServicio: number;
  tipoReserva: string;
  nroReserva: number;
  idTerapia: number | null;
  idCita: string;
  cita: Cita;
  reserva: Reserva | null;
  idFisioterapeuta: string | null;
  evolucion: string | null;
  realizacion: OrdenRealizado;
};

export type OrdenesFisioterapeuta = {
  idOrdenServicio: number;
  idPaciente: number;
  paciente: string;
  datoClinico: string | null;
  idTerapia: number;
  terapia: number;
  evolucion: string | null;
  realizacion: OrdenRealizado;
  fecha: string;
  hora: string;
  duracion: string;
  direccion: string;
  direccionReserva: string | null;
};

export type OrdenServicioPorFecha = {
  title: string;
  data: OrdenesFisioterapeuta[];
};

export type Reserva = {};
