import API from 'common/api'
import { QUERY_KEYS } from './keys'
import { QueryResult } from 'common/types'
import { useQuery } from 'react-query'
import type { Option } from 'common/types'

export const useRoleQuery = (): QueryResult<Option[] | undefined> =>
  useQuery({
    queryKey: QUERY_KEYS.roles,
    queryFn: () => API.getRoles(),
    initialData: {
      rolesById: {},
      rolesIds: [],
    },
    select: (data) => {
      const { rolesById, rolesIds } = data
      return rolesIds.map((roleId) => {
        const role = rolesById[roleId]
        return {
          label: role.name,
          value: role.id,
        }
      })
    },
  })
