/**
 * @file authService.ts
 * @description Servicio de autenticación de usuarios.
 */

import { User } from '../models/UserModels';
import { users } from '../mock/users';

/**
 * Valida las credenciales ingresadas (login y password) contra la lista de usuarios.
 * @param login Nombre de usuario
 * @param password Contraseña
 * @returns Objeto `User` si las credenciales coinciden, o `null` si son incorrectas (similar a FirstOrDefault en LINQ).
 */
export function authenticate(login: string, password: string): User | null {
  return users.find((user) => user.login === login && user.password === password) ?? null;
}
