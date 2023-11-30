import { useMemo } from 'react'

import { AugmentedUser } from 'common/types/user'
import {
  useDeleteUserMutation,
  useUserQuery,
} from 'common/queries/useUserQuery'
import { useUserStore } from '../store'
import { MODAL_TYPES } from '../types'
import { useRoleQuery } from 'common/queries/useRoleQuery'

const useDashboard = () => {
  const {
    user,
    modalType,
    setModalType,
    showPassword,
    setShowPassword,
    setUser,
    selectedUsersIds,
    setSelectedUsersIds,
  } = useUserStore((state) => state)
  const userQuery = useUserQuery()
  const roleQuery = useRoleQuery()
  const deleteUsers = useDeleteUserMutation()
  const users = useMemo(
    () => (userQuery.data != null ? userQuery.data : []),
    [userQuery.data],
  )
  const roles = useMemo(
    () => (roleQuery.data != null ? roleQuery.data : []),
    [roleQuery.data],
  )

  const onRowClick = (user: AugmentedUser): void => {
    setUser(user)
    setModalType(MODAL_TYPES.UPSERT)
  }
  const closeModal = (): void => {
    setModalType(null)
  }
  const onCloseModal = (): void => {
    setUser({})
    closeModal()
  }

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword)
  }
  const openUpsertModal = (): void => {
    setModalType(MODAL_TYPES.UPSERT)
  }
  const openDeleteModal = (): void => {
    setModalType(MODAL_TYPES.DELETE)
  }

  const onDeleteUsers = async (): Promise<void> => {
    await deleteUsers.mutateAsync(selectedUsersIds)
    setSelectedUsersIds([])
    closeModal()
  }

  return {
    user,
    users,
    roles,
    onRowClick,
    onCloseModal,
    toggleShowPassword,
    showPassword,
    modalType,
    selectedUsersIds,
    setSelectedUsersIds,
    openUpsertModal,
    closeModal,
    openDeleteModal,
    onDeleteUsers,
  }
}

export { useDashboard }
