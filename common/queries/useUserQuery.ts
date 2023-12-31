import API from 'common/api'
import { QUERY_KEYS } from './keys'
import {
  AugmentedUser,
  QueryResult,
  MutationOptions,
  MutationResult,
  SerializedResponse,
  UpsertUser,
} from 'common/types'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { enqueueSnackbar } from 'notistack'
export const useUserQuery = (): QueryResult<AugmentedUser[] | undefined> =>
  useQuery({
    queryKey: QUERY_KEYS.users,
    queryFn: () => API.getUsers(),
    initialData: {
      usersById: {},
      usersIds: [],
    },
    select: (data) => {
      const { usersById, usersIds } = data
      return usersIds.map((userId) => usersById[userId])
    },
  })

export const useDeleteUserMutation = (
  options?: MutationOptions<string[], string[]>,
): MutationResult<string[], string[]> => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (usersIds) => API.deleteUser(usersIds),
    onSuccess: (deletedUsersIds) => {
      queryClient.setQueryData<
        SerializedResponse<AugmentedUser, { users: string }>
      >(QUERY_KEYS.users, (oldData) => {
        if (oldData == null) {
          return {
            usersById: {},
            usersIds: [],
          }
        }
        const { usersById, usersIds } = oldData
        const newUsersIds = usersIds.filter(
          (userId) => !deletedUsersIds.includes(userId),
        )
        const newUsersById = {
          ...usersById,
        }
        deletedUsersIds.forEach((userId) => {
          delete newUsersById[userId]
        })
        return {
          usersById: newUsersById,
          usersIds: newUsersIds,
        }
      })
      enqueueSnackbar(`User(s) deleted`, { variant: `success` })
    },
    onError: () => {
      enqueueSnackbar(`Error deleting user(s)`, { variant: `error` })
    },
    ...options,
  })
  return mutation
}

export const useUpsertUserMutation = (
  options?: MutationOptions<AugmentedUser, Partial<UpsertUser>>,
): MutationResult<AugmentedUser, Partial<UpsertUser>> => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (user: Partial<UpsertUser>) => API.upsertUser(user),
    onSuccess: (upsertedUser) => {
      queryClient.setQueryData<
        SerializedResponse<AugmentedUser, { users: string }>
      >(QUERY_KEYS.users, (oldData) => {
        if (oldData == null) {
          return {
            usersById: {},
            usersIds: [],
          }
        }
        const { usersById, usersIds } = oldData
        const newUsersIds = [...usersIds]
        if (!usersIds.includes(upsertedUser.id)) {
          newUsersIds.push(upsertedUser.id)
        }
        const newUsersById = {
          ...usersById,
          [upsertedUser.id]: upsertedUser,
        }
        const sortedUsersIds = newUsersIds.sort((a, b) => {
          const userA = newUsersById[a]
          const userB = newUsersById[b]
          if (userA.firstName < userB.firstName) {
            return -1
          }
          if (userA.firstName > userB.firstName) {
            return 1
          }
          return 0
        })

        return {
          usersById: newUsersById,
          usersIds: sortedUsersIds,
        }
      })
      enqueueSnackbar(`Saved!`, { variant: `success` })
    },
    onError: (error) => {
      enqueueSnackbar(`Error saving user: ${error}`, { variant: `error` })
    },
    ...options,
  })
  return mutation
}
