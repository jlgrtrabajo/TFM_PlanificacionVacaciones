import { User } from '../models/UserModels';
import { users } from '../mock/users';

export function authenticate(login: string, password: string): User | null {
  return users.find((user) => user.login === login && user.password === password) ?? null;
}
