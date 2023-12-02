import { create } from 'zustand'
import { DashboardStore } from './types'

export const useDashboardStore = create<DashboardStore>((set) => ({
  showPassword: false,
  selectedUsersIds: [],
  user: {},
  modalType: null,
  search: ``,
  setUser: (user) => set({ user }),
  setShowPassword: (showPassword) => set({ showPassword }),
  setSelectedUsersIds: (selectedUsersIds) => set({ selectedUsersIds }),
  setModalType: (modalType) => set({ modalType }),
  setSearch: (search) => set({ search }),
}))
