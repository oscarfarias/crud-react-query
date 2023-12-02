import { RequiredEntityData } from '@mikro-orm/core'
import { Role, User } from 'entities'

export interface AugmentedUser extends Omit<User, `role` | `password`> {
  role: Omit<RequiredEntityData<Role>, `users`>
  password?: string
}
export interface RequiredAugmentedUser
  extends Omit<RequiredEntityData<User>, `id`> {
  id: string
}

export interface UpsertUser extends Omit<AugmentedUser, `role`> {
  role: number
}
