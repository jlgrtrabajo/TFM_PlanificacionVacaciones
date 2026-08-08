export interface User {
  id: number;
  login: string;
  password: string;
  name: string;
  surname1?: string;
  surname2?: string;
  email: string;
  profileId: number;
  departmentId: number;
}

export interface Profile {
  id: number;
  description: 'Usuario' | 'AdminPlanifVacac';
}

export interface Department {
  id: number;
  name: string;
}

export interface DepartmentApprover {
  id: number;
  departmentId: number;
  userId: number;
}
