import { useMemo } from 'react'
import { AugmentedUser } from 'common/types/user'
import {
  useDeleteUserMutation,
  useUpsertUserMutation,
  useUserQuery,
} from 'common/queries/useUserQuery'
import { useUserStore } from '../store'
import { MODAL_TYPES } from '../types'
import { useRoleQuery } from 'common/queries/useRoleQuery'
import { Role } from 'entities'

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
  const upsertUser = useUpsertUserMutation()
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
  const onUpsertUser = async (): Promise<void> => {
    await upsertUser.mutateAsync(user)
    setUser({})
    closeModal()
  }
  const onChangeFirstName = (firstName: string): void => {
    setUser({
      ...user,
      firstName,
    })
  }
  const onChangeLastName = (lastName: string): void => {
    setUser({
      ...user,
      lastName,
    })
  }
  const onChangeEmail = (email: string): void => {
    setUser({
      ...user,
      email,
    })
  }
  const onChangeRole = (role: number): void => {
    setUser({
      ...user,
      role: role as unknown as Role,
    })
  }
  const onChangePassword = (password: string): void => {
    setUser({
      ...user,
      password,
    })
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
    onUpsertUser,
    onChangeEmail,
    onChangeFirstName,
    onChangeLastName,
    onChangeRole,
    onChangePassword,
  }
}

export { useDashboard }
