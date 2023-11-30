import API from 'common/api'
import { QUERY_KEYS } from './keys'
import { AugmentedUser, QueryResult } from 'common/types'
import { useQuery } from 'react-query'

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
