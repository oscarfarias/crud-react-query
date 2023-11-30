import { useMemo } from 'react'

import { AugmentedUser } from 'common/types/user'
import { useUserQuery } from 'common/queries/useUserQuery'
import { useUserStore } from '../store'

import { useRoleQuery } from 'common/queries/useRoleQuery'

const useDashboard = () => {
  const userQuery = useUserQuery()
  const roleQuery = useRoleQuery()
  const users = useMemo(
    () => (userQuery.data != null ? userQuery.data : []),
    [userQuery.data],
  )
  const roles = useMemo(
    () => (roleQuery.data != null ? roleQuery.data : []),
    [roleQuery.data],
  )

  const {
    user,
    isModalOpen,
    openModal,
    closeModal,
    showPassword,
    setShowPassword,
    setUser,
  } = useUserStore((state) => state)

  const onRowClick = (user: AugmentedUser): void => {
    setUser(user)
    openModal()
  }
  const onCloseModal = (): void => {
    setUser({})
    closeModal()
  }

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword)
  }
  return {
    user,
    users,
    roles,
    isModalOpen,
    onRowClick,
    onCloseModal,
    toggleShowPassword,
    showPassword,
    openModal,
  }
}

export { useDashboard }
