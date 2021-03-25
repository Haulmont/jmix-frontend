// import {useCallback} from "react";
// import {message} from "antd";
// import { FetchResult } from "@apollo/client";
// import {useIntl} from "react-intl";
// import {action} from "mobx";
// import {ValidateErrorEntity} from "rc-field-form/lib/interface";
// import {selectFormSuccessMessageId} from "../ui/form/Form";

// export interface SaveMutationEntityHookOptions<TEntity, TData> {
//     handleUpsertMutationEntity: (values: TEntity) => Promise<FetchResult<TData>>;
//     entityId?: string;
//     onSuccess?: () => void;
// }
  
// export interface SaveMutationEntityHookResult<TEntity> {
//     handleSaveMutation: (values: TEntity) => void;
//     handleSaveMutationFailed: (errorInfo: ValidateErrorEntity<TEntity>) => void;
// }
  
// export function useSaveMutationEntity<
//     TEntity extends Record<string, any> = Record<string, any>,
//     TData extends Record<string, any> = Record<string, any>
// >(
//     options: SaveMutationEntityHookOptions<TEntity, TData>
// ): SaveMutationEntityHookResult<TEntity> {
//     const {
//         handleUpsertMutationEntity,
//         entityId,
//         onSuccess,
//     } = options;
  
//     const intl = useIntl();
  
//     const isNewEntity = (entityId == null);
  
//     const handleSaveMutationFailed = useCallback(() => {
//         message.error(
//             intl.formatMessage({ id: "management.editor.validationError" })
//         );
//     }, [intl]);
  
//     const handleSaveMutation = useCallback(
//         (values: TEntity) => {
//             handleUpsertMutationEntity(values)
//                 .then(action(({errors}: FetchResult<TData, Record<string, any>, Record<string, any>>) => {
//                     if (errors == null || errors.length === 0) {
//                     const successMessageId = selectFormSuccessMessageId(
//                         isNewEntity ? "create" : "edit"
//                     );
//                     message.success(intl.formatMessage({ id: successMessageId }));
//                     if (onSuccess != null) {
//                         onSuccess();
//                     }
//                     } else {
//                     console.error(errors);
//                     message.error(intl.formatMessage({ id: "common.requestFailed" }));
//                     }
//                 }))
//                 .catch((e: Error) => {
//                     console.error(e);
//                     message.error(intl.formatMessage({ id: "common.requestFailed" }));
//                 });
//       },
//       [handleUpsertMutationEntity, isNewEntity, intl, onSuccess]
//     );
  
//     return {handleSaveMutation, handleSaveMutationFailed};
// }