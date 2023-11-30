import { useQuery as useReactQuery } from 'react-query'
import { QueryResult, QueryOptions } from 'common/types'

export const useQuery = <T>(options: QueryOptions<T>): QueryResult<T> => {
  const query = useReactQuery(options)

  return { ...query, data: query.data ?? options.initialData }
}
