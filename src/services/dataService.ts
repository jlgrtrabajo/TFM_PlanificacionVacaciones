/**
 * @file dataService.ts
 * @description Servicio centralizador de consultas a maestros de datos (departamentos, usuarios, perfiles, notificaciones, etc.).
 */

import { VacationPlanning } from '../models/VacationModels';
import { calendar } from '../mock/calendar';
import { departments } from '../mock/departments';
import { profiles } from '../mock/profiles';
import { users } from '../mock/users';
import { approvers } from '../mock/approvers';
import { notifications } from '../mock/notifications';
import * as planningService from './planningService';

/** Obtiene el listado completo de días del calendario del año */
export function getCalendar() {
  return calendar;
}

/** Obtiene el catálogo de departamentos de la empresa */
export function getDepartments() {
  return departments;
}

/** Obtiene la lista de perfiles de rol */
export function getProfiles() {
  return profiles;
}

/** Obtiene la lista de usuarios del sistema */
export function getUsers() {
  return users;
}

/** Obtiene las asignaciones de responsables aprobadores de departamento */
export function getApprovers() {
  return approvers;
}

/** Obtiene el historial de notificaciones/correos simulados */
export function getNotifications() {
  return notifications;
}

/** Obtiene todas las planificaciones llamando al servicio de planificaciones */
export function getPlannings() {
  return planningService.getAllPlannings();
}

/**
 * Busca una planificación específica por su ID.
 */
export function getPlanningById(planningId: number): VacationPlanning | undefined {
  return planningService.getAllPlannings().find((planning) => planning.id === planningId);
}

/**
 * Obtiene las planificaciones asociadas a un ID de usuario.
 */
export function getPlanningsByUserId(userId: number): VacationPlanning[] {
  return planningService.getPlanningsByUserId(userId);
}

/**
 * Obtiene las planificaciones pendientes de revisión ('PENDING') pertenecientes a empleados de un departamento específico.
 */
export function getPendingPlanningsForDepartment(departmentId: number): VacationPlanning[] {
  return planningService.getAllPlannings().filter((planning) => {
    const user = users.find((item) => item.id === planning.userId);
    return user?.departmentId === departmentId && planning.status === 'PENDING';
  });
}
