import {PacienteConDirecciones} from '../contants/models';

export const pacientes: PacienteConDirecciones[] = [
  {
    cedula: '123456789',
    nombreCompleto: 'Juan Perez',
    correo: 'juan.perez@gmail.com',
    telefono: '099123456',
    direcciones: [
      {
        idDireccion: '1001',
        pais: 'Uruguay',
        departamento: 'Paysandu',
        calle: 'Esta es una direccion de ejemplo',
        numero: '123',
        ciudad: 'Paysandu',
      },
    ],
    historialClinico: 'Esto es un historial clinico',
  },
  {
    cedula: '987654321',
    nombreCompleto: 'Maria Gonzalez',
    correo: 'maria.gonzales@gmail.com',
    telefono: '099987654',
    direcciones: [
      {
        idDireccion: '1001',
        pais: 'Uruguay',
        departamento: 'Paysandu',
        calle: 'Esta es una direccion de ejemplo',
        numero: '123',
        ciudad: 'Paysandu',
      },
    ],
    historialClinico: 'Esto es un historial clinico',
  },
  {
    cedula: '111111111',
    nombreCompleto: 'Pedro Gomez',
    correo: 'pedro.gomez@gmail.com',
    telefono: '099111111',
    direcciones: [
      {
        idDireccion: '1001',
        pais: 'Uruguay',
        departamento: 'Paysandu',
        calle: 'Esta es una direccion de ejemplo',
        numero: '123',
        ciudad: 'Paysandu',
      },
    ],
    historialClinico: 'Esto es un historial clinico',
  },
  {
    cedula: '222222222',
    nombreCompleto: 'Ana Garcia',
    correo: 'ana.garcia@gmail.com',
    telefono: '099222222',
    direcciones: [
      {
        idDireccion: '1001',
        pais: 'Uruguay',
        departamento: 'Paysandu',
        calle: 'Esta es una direccion de ejemplo',
        numero: '123',
        ciudad: 'Paysandu',
      },
    ],
    historialClinico: 'Esto es un historial clinico',
  },
  {
    cedula: '333333333',
    nombreCompleto: 'Carlos Rodriguez',
    correo: 'carlos.rogriguez@gmail.com',
    telefono: '099333333',
    direcciones: [
      {
        idDireccion: '1001',
        pais: 'Uruguay',
        departamento: 'Paysandu',
        calle: 'Esta es una direccion de ejemplo',
        numero: '123',
        ciudad: 'Paysandu',
      },
    ],
    historialClinico: 'Esto es un historial clinico',
  },
];
