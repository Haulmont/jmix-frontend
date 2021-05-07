import { DocumentNode, LazyQueryHookOptions, LazyQueryResult, TypedDocumentNode, useLazyQuery } from "@apollo/client";
import { GraphQLQueryFn, HasId } from "@haulmont/jmix-react-core";
import { useEffect } from "react";

export interface LoadEntityHookOptions<TData, TVariables> {
    loadQuery: DocumentNode | TypedDocumentNode;
    loadQueryOptions?: LazyQueryHookOptions<TData, TVariables>;
    entityId?: string;
    hasAssociations?: boolean;
}

export type LoadEntityHookResult<TData, TVariables> = [GraphQLQueryFn<TVariables>, LazyQueryResult<TData, TVariables>];

export const useLoadEntityQuery = <
    TData extends Record<string, any> = Record<string, any>,
    TVariables extends HasId = HasId
>(
    options: LoadEntityHookOptions<TData, TVariables>
): LoadEntityHookResult<TData, TVariables> => {
    const {
        loadQuery,
        loadQueryOptions,
        entityId,
        hasAssociations
      } = options;

    const [load, loadQueryResult] = useLazyQuery<TData, TVariables>(loadQuery, loadQueryOptions);

    // Fetch the entity (if editing) and association options from backend
    useEffect(() => {
        if (entityId != null || hasAssociations) {
            load({
                variables: {
                id: entityId,
                loadItem: entityId != null
                } as unknown as TVariables
            });
        }
    }, [entityId, load, hasAssociations]);

    return [load, loadQueryResult];
}
