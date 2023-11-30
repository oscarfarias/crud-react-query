import { AugmentedUser } from 'common/types'
export type UserState = {
  isModalOpen: boolean
  user: Partial<AugmentedUser>
  showPassword: boolean
}

export type UserActions = {
  openModal: () => void
  closeModal: () => void
  setUser: (user: Partial<AugmentedUser>) => void
  setShowPassword: (showPassword: boolean) => void
}

export type UserStore = UserState & UserActions
