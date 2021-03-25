// import {useCallback, useEffect} from "react";
// import {
//   DocumentNode,
//   LazyQueryHookOptions,
//   LazyQueryResult,
//   MutationHookOptions, MutationResult,
//   TypedDocumentNode
// } from "@apollo/client";
// import {
//   GraphQLMutationFn,
//   GraphQLQueryFn,
//   HasId,
//   useMetadata,
//   Screens,
//   IMultiScreenItem,
//   redirect,
//   dollarsToUnderscores
// } from "@haulmont/jmix-react-core";
// import {ValidateErrorEntity} from "rc-field-form/lib/interface";
// import {graphqlToAntForm} from "../formatters/graphqlToAntForm";
// import { useLoadEntityQuery } from "./useLoadEntityQuery";
// import { useMutationEntity } from "./useMutationEntity";
// import { useSaveMutationEntity } from "./useSaveMutationEntity";
// import { EntityEditorStore, useEntityEditorStore } from "./editor/useEntityEditor";

// export interface EntityEditorFormStepsHookOptions<TData, TVariables> {
//   loadQuery: DocumentNode | TypedDocumentNode;
//   loadQueryOptions?: LazyQueryHookOptions<TData, TVariables>;
//   onLoadEntity: (values: Record<string, any>) => void;
//   upsertMutation: DocumentNode | TypedDocumentNode;
//   upsertMutationOptions?: MutationHookOptions<TData, TVariables>;
//   entityId?: string;
//   queryName?: string;
//   entityName: string;
//   upsertInputName: string;
//   updateResultName?: string;
//   listQueryName?: string;
//   routingPath: string;
//   hasAssociations?: boolean;
//   screens: Screens;
//   multiScreen: IMultiScreenItem;
// }

// export interface EntityEditorFormStepsHookResult<TEntity, TData, TVariables> {
//   load: GraphQLQueryFn<TVariables>;
//   loadQueryResult: LazyQueryResult<TData, TVariables>;
//   upsertItem: GraphQLMutationFn<TData, TVariables>;
//   upsertMutationResult: MutationResult;
//   store: EntityEditorStore;
//   associationOptions?: TData;
//   handleFinish: (values: TEntity) => void;
//   handleFinishFailed: (errorInfo: ValidateErrorEntity<TEntity>) => void;
//   handleCancelBtnClick: () => void;
// }

// export function useEntityEditorFormSteps<
//   TEntity,
//   TData extends Record<string, any> = Record<string, any>,
//   TVariables extends HasId = HasId
// >(
//   options: EntityEditorFormStepsHookOptions<TData, TVariables>
// ): EntityEditorFormStepsHookResult<TEntity, TData, TVariables> {
//   const {
//     loadQuery,
//     loadQueryOptions,
//     onLoadEntity,
//     upsertMutation,
//     upsertMutationOptions,
//     entityId,
//     entityName,
//     queryName = `${dollarsToUnderscores(entityName)}ById`,
//     updateResultName = `upsert_${dollarsToUnderscores(entityName)}`,
//     listQueryName = `${dollarsToUnderscores(entityName)}List`,
//     upsertInputName,
//     hasAssociations,
//     routingPath,
//     screens,
//     multiScreen,
//   } = options;

//   const metadata = useMetadata();
//   const store: EntityEditorStore = useEntityEditorStore();

//   const [load, loadQueryResult] = useLoadEntityQuery<TData, TVariables>({
//     entityId,
//     loadQuery,
//     loadQueryOptions,
//     hasAssociations,
//   })
//   const {loading: queryLoading, error: queryError, data} = loadQueryResult;

//   // Fill the form based on retrieved data
//   useEffect(() => {
//     if (
//       entityId != null && // Editing an entity
//       !queryLoading &&
//       queryError == null &&
//       data != null
//     ) {
//       const values = graphqlToAntForm<TEntity>(data[queryName], entityName, metadata)
//       onLoadEntity(values)
//     }
//   }, [queryLoading, queryError, data, metadata, queryName, entityName, entityId]);

//   const goBackToBrowserScreen = useCallback(() => {
//     if (screens.currentScreenIndex === 1) {
//       redirect(routingPath);
//     }
//     screens.setActiveScreen(multiScreen.parent!, true);
//   }, [screens, routingPath, multiScreen]);

//   const handleCancelBtnClick = goBackToBrowserScreen;

//   const [upsertItem, upsertMutationResult, handleUpsertMutationEntity] = useMutationEntity<TEntity, TData, TVariables>({
//     upsertMutation,
//     upsertMutationOptions,
//     entityName,
//     upsertInputName,
//     updateResultName,
//     listQueryName,
//     entityId
//   });

//   const {handleSaveMutation, handleSaveMutationFailed} = useSaveMutationEntity<TEntity, TData>({
//     handleUpsertMutationEntity,
//     entityId,
//     onSuccess: goBackToBrowserScreen,
//   });

//   return {
//     load,
//     loadQueryResult,
//     upsertItem,
//     upsertMutationResult,
//     store,
//     handleFinish: handleSaveMutation,
//     handleFinishFailed: handleSaveMutationFailed,
//     handleCancelBtnClick,
//     associationOptions: data
//   };
// }
