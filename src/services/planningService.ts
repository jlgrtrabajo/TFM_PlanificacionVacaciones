import { plannings as initialPlannings } from '../mock/plannings';
import type { VacationPlanning, VacationPlanningLine } from '../models/VacationModels';

const STORAGE_KEY = 'plannings_v1';

const plannings: VacationPlanning[] = [];

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

function persist() {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plannings));
  } catch (e) {
    // ignore
  }
}

loadFromStorage();

export function getAllPlannings(): VacationPlanning[] {
  return plannings;
}

export function getPlanningsByUserId(userId: number): VacationPlanning[] {
  return plannings.filter((planning) => planning.userId === userId);
}

export function getPendingPlanningByUserId(userId: number): VacationPlanning | undefined {
  return plannings.find((planning) => planning.userId === userId && planning.status === 'PENDING');
}

export function getPlanningHistoryByUserId(userId: number): VacationPlanning[] {
  return plannings
    .filter((planning) => planning.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function savePlanningLines(planningId: number, lines: VacationPlanningLine[]) {
  const planning = plannings.find((item) => item.id === planningId);
  if (!planning) return;

  planning.lines = lines;
  planning.totalDays = lines.reduce((sum, line) => sum + line.workingDays, 0);
  planning.modifiedAt = new Date().toISOString();
  persist();
}

export function createNewPlanning(planning: VacationPlanning) {
  // Add to the head so it's immediately the active planning
  plannings.unshift(planning);
  persist();
}

export function updatePlanning(updated: VacationPlanning) {
  const idx = plannings.findIndex((p) => p.id === updated.id);
  if (idx === -1) return;
  plannings[idx] = { ...plannings[idx], ...updated };
  persist();
}
