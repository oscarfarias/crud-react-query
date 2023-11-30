import { create } from 'zustand'
import { UserStore } from './types'

export const useUserStore = create<UserStore>((set) => ({
  isModalOpen: false,
  showPassword: false,
  user: {},
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  setUser: (user) => set({ user }),
  setShowPassword: (showPassword) => set({ showPassword }),
}))
