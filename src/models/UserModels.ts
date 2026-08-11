/**
 * @file UserModels.ts
 * @description Modelos de datos para usuarios, perfiles de acceso y departamentos.
 * 
 * NOTA DE LENGUAJE (TypeScript):
 * - `surname1?: string`: El signo `?` indica que la propiedad es opcional (puede ser `undefined` o `string`),
 *   similar a un tipo nullable `string?` en C#.
 * - `'Usuario' | 'AdminPlanifVacac'`: Unión de literales (Union Types), que restringe los valores
 *   exactos permitidos, actuando de forma similar a un Enum en C# o SQL CHECK constraint.
 */

/**
 * Representa a un usuario/empleado de la aplicación.
 */
export interface User {
  /** Identificador único del usuario (Primary Key) */
  id: number;
  /** Nombre de usuario para iniciar sesión */
  login: string;
  /** Contraseña en texto plano para el mock (en producción se usaría un hash) */
  password: string;
  /** Nombre del empleado */
  name: string;
  /** Primer apellido (opcional) */
  surname1?: string;
  /** Segundo apellido (opcional) */
  surname2?: string;
  /** Dirección de correo electrónico */
  email: string;
  /** ID del perfil asignado (1 = Usuario estándar, 2 = Administrador) */
  profileId: number;
  /** ID del departamento al que pertenece el empleado */
  departmentId: number;
}

/**
 * Perfil o rol del usuario en la plataforma.
 */
export interface Profile {
  /** Identificador único del perfil */
  id: number;
  /** Descripción del perfil restringida a dos roles específicos */
  description: 'Usuario' | 'AdminPlanifVacac';
}

/**
 * Departamento de la empresa.
 */
export interface Department {
  /** Identificador único del departamento */
  id: number;
  /** Nombre comercial o descriptivo del departamento */
  name: string;
}

/**
 * Asignación de un responsable/aprobador de vacaciones para un departamento.
 */
export interface DepartmentApprover {
  /** Identificador único de la asignación */
  id: number;
  /** ID del departamento supervisado */
  departmentId: number;
  /** ID del usuario que actúa como aprobador */
  userId: number;
}
