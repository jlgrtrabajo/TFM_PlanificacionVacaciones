import { describe, it, expect } from 'vitest';
import * as planningService from '../services/planningService';

describe('planningService', () => {
  it('creates and updates planning', () => {
    const before = planningService.getAllPlannings().length;
    const newPlanning = {
      id: 999999,
      userId: 1,
      employeeName: 'Test User',
      year: 2026,
      totalDays: 0,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      lines: [],
    } as any;

    planningService.createNewPlanning(newPlanning);
    expect(planningService.getAllPlannings().length).toBe(before + 1);

    planningService.updatePlanning({ ...newPlanning, status: 'APPROVED', approverId: 11, approvalDate: new Date().toISOString() });
    const found = planningService.getAllPlannings().find((p) => p.id === newPlanning.id);
    expect(found).toBeDefined();
    expect(found?.status).toBe('APPROVED');
  });

  it('saves lines', () => {
    const p = planningService.getAllPlannings()[0];
    planningService.savePlanningLines(p.id, [
      { id: 5000, planningId: p.id, startDate: '2026-07-01', endDate: '2026-07-10', workingDays: 8 },
    ] as any);
    const updated = planningService.getAllPlannings().find((x) => x.id === p.id);
    expect(updated?.lines.length).toBeGreaterThan(0);
  });
});
