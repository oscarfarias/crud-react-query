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
  search: string
}

export type DashboardActions = {
  setUser: (user: Partial<AugmentedUser>) => void
  setShowPassword: (showPassword: boolean) => void
  setSelectedUsersIds: (selectedUsersIds: string[]) => void
  setModalType: (modalType: MODAL_TYPES | null) => void
  setSearch: (search: string) => void
}

export type DashboardStore = DashboardState & DashboardActions
