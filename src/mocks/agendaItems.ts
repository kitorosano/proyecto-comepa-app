import {OrdenRealizado} from '../contants/models';

export const agendaItems = (dates: any[]) => [
  {
    title: dates[0],
    data: [
      {
        fecha: dates[0],
        hora: '12:00:00',
        duracion: '00:30:00',
        direccion: 'Colón 1224',
        paciente: 'Andres Cabrera',
        realizacion: OrdenRealizado.REALIZADA,
        evaluacion: 'Esta es la evaluacion del paciente hasta la fecha actual',
      },
      {
        fecha: dates[0],
        hora: '12:30:00',
        duracion: '00:30:00',
        direccion: 'Colón 1224',
        paciente: 'Matias De Pintos',
        realizacion: OrdenRealizado.REALIZADA,
        evaluacion: 'Esta es la evaluacion del paciente hasta la fecha actual',
      },
      {
        fecha: dates[0],
        hora: '13:00:00',
        duracion: '00:30:00',
        direccion: 'Colón 1224',
        paciente: 'Juana Rodriguez',
        realizacion: OrdenRealizado.NO_REALIZADA,
        evaluacion: 'Esta es la evaluacion del paciente hasta la fecha actual',
      },
      {
        fecha: dates[0],
        hora: '15:30:00',
        duracion: '01:00:00',
        direccion: 'Colón 1224',
        paciente: 'Ashley Rosas',
        realizacion: OrdenRealizado.FALTO,
        evaluacion: 'Esta es la evaluacion del paciente hasta la fecha actual',
      },
    ],
  },
  {
    title: dates[1],
    data: [
      {
        fecha: dates[1],
        hora: '16:00:00',
        duracion: '01:00:00',
        direccion: 'Colón 1224',
        paciente: 'Ashley Rosas',
        realizacion: OrdenRealizado.PENDIENTE,
        evaluacion: 'Esta es la evaluacion del paciente hasta la fecha actual',
      },
      {
        fecha: dates[1],
        hora: '17:00:00',
        duracion: '00:30:00',
        direccion: 'Colón 1224',
        paciente: 'Tomas Mileto',
        realizacion: OrdenRealizado.PENDIENTE,
        evaluacion: 'Esta es la evaluacion del paciente hasta la fecha actual',
      },
    ],
  },
  {
    title: dates[2],
    data: [
      {
        fecha: dates[2],
        hora: '12:30:00',
        duracion: '00:30:00',
        direccion: 'Colón 1224',
        paciente: 'Matias De Pintos',
        realizacion: OrdenRealizado.PENDIENTE,
        evaluacion: 'Esta es la evaluacion del paciente hasta la fecha actual',
      },
      {
        fecha: dates[2],
        hora: '13:00:00',
        duracion: '00:30:00',
        direccion: 'Colón 1224',
        paciente: 'Juana Rodriguez',
        realizacion: OrdenRealizado.PENDIENTE,
        evaluacion: 'Esta es la evaluacion del paciente hasta la fecha actual',
      },
      {
        fecha: dates[2],
        hora: '15:30:00',
        duracion: '01:00:00',
        direccion: 'Colón 1224',
        paciente: 'Ashley Rosas',
        realizacion: OrdenRealizado.PENDIENTE,
        evaluacion: 'Esta es la evaluacion del paciente hasta la fecha actual',
      },
    ],
  },
  {
    title: dates[3],
    data: [
      {
        fecha: dates[3],
        hora: '12:00:00',
        duracion: '01:00:00',
        direccion: 'Colón 1224',
        paciente: 'Andres Cabrera',
        realizacion: OrdenRealizado.PENDIENTE,
        evaluacion: 'Esta es la evaluacion del paciente hasta la fecha actual',
      },
    ],
  },
  {
    title: dates[4],
    data: [
      {
        fecha: dates[4],
        hora: '12:00:00',
        duracion: '00:30:00',
        direccion: 'Colón 1224',
        paciente: 'Andres Cabrera',
        realizacion: OrdenRealizado.PENDIENTE,
        evaluacion: 'Esta es la evaluacion del paciente hasta la fecha actual',
      },
      {
        fecha: dates[4],
        hora: '12:30:00',
        duracion: '00:30:00',
        direccion: 'Colón 1224',
        paciente: 'Matias De Pintos',
        realizacion: OrdenRealizado.PENDIENTE,
        evaluacion: 'Esta es la evaluacion del paciente hasta la fecha actual',
      },
      {
        fecha: dates[4],
        hora: '13:00:00',
        duracion: '00:30:00',
        direccion: 'Colón 1224',
        paciente: 'Juana Rodriguez',
        realizacion: OrdenRealizado.PENDIENTE,
        evaluacion: 'Esta es la evaluacion del paciente hasta la fecha actual',
      },
      {
        fecha: dates[4],
        hora: '15:30:00',
        duracion: '01:00:00',
        direccion: 'Colón 1224',
        paciente: 'Ashley Rosas',
        realizacion: OrdenRealizado.PENDIENTE,
        evaluacion: 'Esta es la evaluacion del paciente hasta la fecha actual',
      },
      {
        fecha: dates[4],
        hora: '16:30:00',
        duracion: '01:00:00',
        direccion: 'Colón 1224',
        paciente: 'Ashley Rosas',
        realizacion: OrdenRealizado.PENDIENTE,
        evaluacion: 'Esta es la evaluacion del paciente hasta la fecha actual',
      },
    ],
  },
];
