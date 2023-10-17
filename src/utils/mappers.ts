import {Cita} from '../contants/models';

type AgendaItem = {
  date: string;
  hour: string;
  duration: string;
  title: string;
  state: AgendaItemState;
};

type AgendaItemState = 'pending' | 'done' | 'cancelled';

export const mapCitasToAgendaItems = (citas: Cita[]) => {
  const agendaItems: AgendaItem[] = [];
  citas.forEach(cita => {
    const agendaItem: AgendaItem = {
      date: cita.fecha,
      hour: cita.hora,
      duration: '1h',
      title: 'Nombre Paciente',
      state: 'pending',
    };
    agendaItems.push(agendaItem);
  });
  return agendaItems;
};
