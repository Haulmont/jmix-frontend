// import { ApolloCache, DocumentNode, FetchResult, gql, MutationHookOptions, MutationResult, TypedDocumentNode, useMutation } from "@apollo/client";
// import { addIdIfExistingEntity, dollarsToUnderscores, GraphQLMutationFn, HasId, useMetadata } from "@haulmont/jmix-react-core";
// import { useCallback } from "react";
// import { antFormToGraphQL } from "../formatters/antFormToGraphQL";

// export interface MutationEntityHookOptions<TData, TVariables> {
//     upsertMutation: DocumentNode | TypedDocumentNode;
//     upsertMutationOptions?: MutationHookOptions<TData, TVariables>;
//     entityId?: string;
//     entityName: string;
//     upsertInputName: string;
//     updateResultName: string;
//     listQueryName: string;
//     hasAssociations?: boolean;
// }
  
// export type MutationEntityHookResult<TEntity, TData, TVariables> = [
//     GraphQLMutationFn<TData, TVariables>,
//     MutationResult<TData>,
//     (values: TEntity) => Promise<FetchResult<TData>>,
// ];

// export const useMutationEntity = <
//     TEntity extends Record<string, any> = Record<string, any>,
//     TData extends Record<string, any> = Record<string, any>,
//     TVariables extends HasId = HasId
// >(options: MutationEntityHookOptions<TData, TVariables>): MutationEntityHookResult<TEntity, TData, TVariables> => {
//     const {
//         upsertMutation,
//         upsertMutationOptions,
//         entityName,
//         upsertInputName,
//         updateResultName,
//         listQueryName,
//         entityId
//     } = options;

//     const metadata = useMetadata();

//     const [upsertItem, upsertMutationResult] = useMutation<TData, TVariables>(upsertMutation, upsertMutationOptions);

//     const handleUpsertMutationEntity = useCallback((values: TEntity) => {
//         const updatedEntity = {
//             ...antFormToGraphQL(values, entityName, metadata),
//             ...addIdIfExistingEntity(entityId)
//         };
//         return upsertItem({
//             variables: {
//             [upsertInputName]: updatedEntity
//             } as any,
//             update(cache: ApolloCache<TData>, result: FetchResult<TData>) {
//             const updateResult = result.data?.[updateResultName];
//             // Reflect the update in Apollo cache
//             cache.modify({
//                 fields: {
//                 [listQueryName](existingRefs = []) {
//                     const updatedItemRef = cache.writeFragment({
//                     id: `${entityName}:${updateResult.id}`,
//                     data: updatedEntity,
//                     fragment: gql(`
//                         fragment New_${dollarsToUnderscores(entityName)} on ${dollarsToUnderscores(entityName)} {
//                         id
//                         type
//                         }
//                     `)
//                     });
//                     return [...existingRefs, updatedItemRef];
//                 }
//                 }
//             });
//             }
//         })
//     }, [entityId, entityName, listQueryName, metadata, updateResultName, upsertInputName, upsertItem]);

//     return [upsertItem, upsertMutationResult, handleUpsertMutationEntity];
// }