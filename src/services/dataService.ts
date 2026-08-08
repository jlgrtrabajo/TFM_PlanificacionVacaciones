import { VacationPlanning } from '../models/VacationModels';
import { SimulatedEmail } from '../models/CalendarModels';
import { calendar } from '../mock/calendar';
import { departments } from '../mock/departments';
import { profiles } from '../mock/profiles';
import { users } from '../mock/users';
import { approvers } from '../mock/approvers';
import { notifications } from '../mock/notifications';
import { plannings } from '../mock/plannings';
import * as planningService from './planningService';

export function getCalendar() {
  return calendar;
}

export function getDepartments() {
  return departments;
}

export function getProfiles() {
  return profiles;
}

export function getUsers() {
  return users;
}

export function getApprovers() {
  return approvers;
}

export function getNotifications() {
  return notifications;
}

export function getPlannings() {
  return planningService.getAllPlannings();
}

export function getPlanningById(planningId: number): VacationPlanning | undefined {
  return planningService.getAllPlannings().find((planning) => planning.id === planningId);
}

export function getPlanningsByUserId(userId: number): VacationPlanning[] {
  return planningService.getPlanningsByUserId(userId);
}

export function getPendingPlanningsForDepartment(departmentId: number): VacationPlanning[] {
  return planningService.getAllPlannings().filter((planning) => {
    const user = users.find((item) => item.id === planning.userId);
    return user?.departmentId === departmentId && planning.status === 'PENDING';
  });
}
