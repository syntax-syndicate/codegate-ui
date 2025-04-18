import { OpenApiTsReactQueryKey } from '@/types/openapi-ts'
import { OptionsLegacyParser } from '@hey-api/client-fetch'
import { Query, QueryClient, QueryObserverOptions } from '@tanstack/react-query'

// NOTE: This is copy/pasted from @/api/generated/@tanstack/react-query.gen
type QueryKey<TOptions extends OptionsLegacyParser = OptionsLegacyParser> = [
  Pick<TOptions, 'baseUrl' | 'body' | 'headers' | 'path' | 'query'> & {
    _id: string
    _infinite?: boolean
  },
]

// A generic type that describes the possible permutations of openapi-ts
// react-query queryKey functions.
//
// NOTE: The use of `any` is required to make it generic enough for use with any
// openapi-ts queryKey fn. The return type constraint is sufficiently strict
// that it is still safe to use.
//
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type QueryKeyFn = (options: any) => QueryKey[0][]

// NOTE: The type constraints on `queryKeyFn` are sufficiently strict that we
// can use type assertion for the return type with relative safety.
const getQueryKeyFnId = <T extends OptionsLegacyParser>(
  queryKeyFn: QueryKeyFn
) => queryKeyFn({} as T)[0]?._id as string

/**
 * Takes a queryClient, and an array of queryKeyFns, and invalidates all queries
 * in the cache with matching query keys.
 */
export function invalidateQueries(
  queryClient: QueryClient,
  queryKeyFns: QueryKeyFn[],
  options: { stale: boolean } = { stale: true }
) {
  // eslint-disable-next-line no-restricted-syntax
  return queryClient.invalidateQueries({
    refetchType: 'all',
    stale: options.stale,
    predicate: (
      query: Query<unknown, Error, unknown, OpenApiTsReactQueryKey>
    ) => {
      return queryKeyFns.some(
        (fn) => query.queryKey[0]._id === getQueryKeyFnId(fn)
      )
    },
  })
}

export function getQueryCacheConfig(
  lifetime: 'no-cache' | '5s' | 'indefinite'
) {
  switch (lifetime) {
    case 'no-cache':
      return {
        staleTime: 0,
      } as const satisfies Pick<QueryObserverOptions, 'staleTime'>

    case '5s':
      return {
        staleTime: 5 * 1_000,
      } as const satisfies Pick<QueryObserverOptions, 'staleTime'>

    case 'indefinite':
      return {
        staleTime: Infinity,
      } as const satisfies Pick<QueryObserverOptions, 'staleTime'>

    default:
      return lifetime satisfies never
  }
}

export function removeQueriesByIds({
  queryClient,
  queryKeyFns,
}: {
  queryClient: QueryClient;
  queryKeyFns: QueryKeyFn[];
}) {
  const allQueries = queryClient.getQueriesData({});

  const queriesToRemove = allQueries.filter(([key]) =>
    key.some((item) =>
      queryKeyFns.some(
        (fn) => getQueryKeyFnId(fn) === (item as { _id: string })._id,
      ),
    ),
  );

  return queriesToRemove.forEach(([queryKey]) =>
    queryClient.removeQueries({ queryKey }),
  );
}
