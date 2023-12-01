import { AugmentedUser } from 'common/types'

export enum MODAL_TYPES {
  UPSERT = `upsert`,
  DELETE = `delete`,
}

export type DashboardState = {
  modalType: MODAL_TYPES | null
  user: Partial<AugmentedUser>
  showPassword: boolean
  selectedUsersIds: string[]
}

export type DashboardActions = {
  setUser: (user: Partial<AugmentedUser>) => void
  setShowPassword: (showPassword: boolean) => void
  setSelectedUsersIds: (selectedUsersIds: string[]) => void
  setModalType: (modalType: MODAL_TYPES | null) => void
}

export type DashboardStore = DashboardState & DashboardActions
