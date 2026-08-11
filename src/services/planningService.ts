/**
 * @file planningService.ts
 * @description Servicio de acceso a datos para planificaciones de vacaciones.
 * 
 * EQUIVALENCIA EN C# / ARQUITECTURA:
 * Este archivo actúa como un Repositorio (Repository Pattern) o Data Access Object (DAO).
 * Administra el almacenamiento persistente en el navegador usando `localStorage` (similar a una tabla de base de datos local),
 * con fallback a los datos iniciales de prueba (Mocks).
 */

import { plannings as initialPlannings } from '../mock/plannings';
import type { VacationPlanning, VacationPlanningLine } from '../models/VacationModels';

/** Clave para guardar en el localStorage del navegador */
const STORAGE_KEY = 'plannings_v1';

/** Array en memoria que sirve de caché principal de datos */
const plannings: VacationPlanning[] = [];

/**
 * Carga las planificaciones desde localStorage. Si no existen o el JSON es inválido,
 * inicializa la caché con los datos de prueba (`initialPlannings`).
 */
function loadFromStorage() {
  try {
    if (typeof localStorage === 'undefined') return;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      plannings.push(...initialPlannings);
      return;
    }
    const parsed = JSON.parse(raw) as VacationPlanning[];
    if (Array.isArray(parsed) && parsed.length) {
      plannings.push(...parsed);
      return;
    }
    plannings.push(...initialPlannings);
  } catch (e) {
    plannings.push(...initialPlannings);
  }
}

/**
 * Guarda el estado actual del array `plannings` en el localStorage del navegador en formato JSON.
 */
function persist() {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plannings));
  } catch (e) {
    // ignorar errores de almacenamiento
  }
}

// Ejecución al cargar el módulo
loadFromStorage();

/**
 * Devuelve todas las planificaciones registradas en la aplicación.
 * @returns Copia del array para asegurar la inmutabilidad y forzar re-renderizados en React.
 */
export function getAllPlannings(): VacationPlanning[] {
  return [...plannings];
}

/**
 * Obtiene todas las planificaciones pertenecientes a un usuario determinado.
 * @param userId ID del usuario
 */
export function getPlanningsByUserId(userId: number): VacationPlanning[] {
  return plannings.filter((planning) => planning.userId === userId);
}

/**
 * Obtiene la planificación con estado 'PENDING' de un usuario (si existe).
 */
export function getPendingPlanningByUserId(userId: number): VacationPlanning | undefined {
  return plannings.find((planning) => planning.userId === userId && planning.status === 'PENDING');
}

/**
 * Obtiene el historial de planificaciones de un usuario ordenado por fecha de creación descendente (de más reciente a más antigua).
 */
export function getPlanningHistoryByUserId(userId: number): VacationPlanning[] {
  return plannings
    .filter((planning) => planning.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/**
 * Actualiza los periodos (líneas) de una planificación existente y recalcula el total de días laborables.
 */
export function savePlanningLines(planningId: number, lines: VacationPlanningLine[]) {
  const planning = plannings.find((item) => item.id === planningId);
  if (!planning) return;
  planning.lines = lines;
  planning.totalDays = lines.reduce((sum, line) => sum + line.workingDays, 0);
  planning.modifiedAt = new Date().toISOString();
  persist();
}

/**
 * Registra una nueva planificación poniéndola al inicio de la lista para que sea la más reciente.
 */
export function createNewPlanning(planning: VacationPlanning) {
  plannings.unshift(planning);
  persist();
}

/**
 * Actualiza los datos de una planificación existente (ej. cambio de estado a APPROVED o REJECTED).
 */
export function updatePlanning(updated: VacationPlanning) {
  const idx = plannings.findIndex((p) => p.id === updated.id);
  if (idx === -1) return;
  plannings[idx] = { ...plannings[idx], ...updated };
  persist();
}
