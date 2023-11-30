import { create } from 'zustand'
import { UserStore } from './types'

export const useUserStore = create<UserStore>((set) => ({
  showPassword: false,
  selectedUsersIds: [],
  user: {},
  modalType: null,
  setUser: (user) => set({ user }),
  setShowPassword: (showPassword) => set({ showPassword }),
  setSelectedUsersIds: (selectedUsersIds) => set({ selectedUsersIds }),
  setModalType: (modalType) => set({ modalType }),
}))
