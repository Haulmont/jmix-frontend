import {FetchResult, MutationFunctionOptions, QueryLazyOptions} from "@apollo/client";

// Aliases of Apollo types
export type GraphQLQueryFn<TVariables> = (options?: QueryLazyOptions<TVariables>) => void;
export type GraphQLMutationFn<TData, TVariables> = (options?: MutationFunctionOptions<TData, TVariables>) => Promise<FetchResult<TData>>;
