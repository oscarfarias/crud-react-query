import { useMemo } from 'react'
import { AugmentedUser, UpsertUser } from 'common/types/user'
import {
  useDeleteUserMutation,
  useUpsertUserMutation,
  useUserQuery,
} from 'common/queries/useUserQuery'
import { useDashboardStore } from '../store'
import { MODAL_TYPES } from '../types'
import { useRoleQuery } from 'common/queries/useRoleQuery'
import schema from '../schema'
import useValidator from 'common/hooks/useValidator'

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
    search,
  } = useDashboardStore((state) => state)

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    control,
  } = useValidator(schema)
  const userQuery = useUserQuery()
  const roleQuery = useRoleQuery()
  const deleteUsers = useDeleteUserMutation()
  const upsertUser = useUpsertUserMutation()
  const users = useMemo(() => {
    if (userQuery.data == null) {
      return []
    }
    if (search.length > 0) {
      return userQuery.data?.filter((user) => {
        return (
          user.firstName.toLowerCase().includes(search.toLowerCase()) ||
          user?.lastName?.toLowerCase()?.includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
        )
      })
    }
    return userQuery.data
  }, [userQuery.data, search])
  const roles = useMemo(
    () => (roleQuery.data != null ? roleQuery.data : []),
    [roleQuery.data],
  )

  const onRowClick = (user: AugmentedUser): void => {
    setUser(user)
    setValue(`id`, user.id)
    setValue(`firstName`, user.firstName)
    setValue(`lastName`, user.lastName)
    setValue(`email`, user.email)
    if (user.role?.id) {
      setValue(`role`, user.role.id)
    }
    setModalType(MODAL_TYPES.UPSERT)
  }
  const closeModal = (): void => {
    setModalType(null)
  }
  const onCloseModal = (): void => {
    setUser({})
    reset()
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
  const onUpsertUser = async (user: UpsertUser): Promise<void> => {
    await upsertUser.mutateAsync(user)
    setUser({})
    reset()
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
    onUpsertUser,
    handleSubmit,
    errors,
    control,
  }
}

export { useDashboard }
