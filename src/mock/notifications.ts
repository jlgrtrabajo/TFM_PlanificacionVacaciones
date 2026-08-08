import { SimulatedEmail } from '../models/CalendarModels';

export const notifications: SimulatedEmail[] = [
  {
    id: 1,
    planningId: 2,
    from: 'sistema@empresa.local',
    to: ['pedro@empresa.local'],
    subject: 'Planificación aprobada',
    body: 'Tu planificación de vacaciones ha sido aprobada por Alberto.',
    sent: true,
    createdAt: '2026-05-12T15:35:00Z',
  },
  {
    id: 2,
    planningId: 3,
    from: 'sistema@empresa.local',
    to: ['silvia@empresa.local'],
    subject: 'Planificación rechazada',
    body: 'Tu planificación ha sido rechazada: El departamento no puede quedar con dos personas de ventas fuera en la misma semana.',
    sent: true,
    createdAt: '2026-03-05T11:25:00Z',
  },
  {
    id: 3,
    planningId: 5,
    from: 'sistema@empresa.local',
    to: ['ernesto@empresa.local'],
    subject: 'Planificación aprobada',
    body: 'Tu planificación ha sido aprobada por Dani.',
    sent: true,
    createdAt: '2026-05-20T12:05:00Z',
  },
];
