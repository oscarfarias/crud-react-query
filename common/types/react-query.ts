import { UseQueryResult, QueryKey, UseQueryOptions } from 'react-query'

interface QueryResultBase<T> extends Omit<UseQueryResult<T, unknown>, `data`> {
  data: T
}

export type QueryResult<T> = QueryResultBase<T>

export interface ExtendedQueryOptions<T, V extends QueryKey = string[], K = T>
  extends Omit<UseQueryOptions<T, unknown, K, V>, `initialData`> {
  initialData: T
}
export type QueryOptions<
  T,
  V extends QueryKey = string[],
  K = T,
> = ExtendedQueryOptions<T, V, K>
