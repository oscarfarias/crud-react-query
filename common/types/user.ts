import { Role, User } from 'entities'

export interface AugmentedUser extends Omit<User, `role` | `password`> {
  role: Omit<Role, `users`>
}
