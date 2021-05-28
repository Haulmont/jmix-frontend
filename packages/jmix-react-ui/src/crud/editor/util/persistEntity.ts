import {IntlShape} from "react-intl";
import {jmixFront_to_jmixGraphQL} from "../../../formatters/jmixFront_to_jmixGraphQL";
import {ApolloCache, FetchResult, gql} from "@apollo/client";
import {action} from "mobx";
import {selectFormSuccessMessageId} from "../../../ui/form/Form";
import {message} from "antd";
import {GraphQLMutationFn, Metadata, dollarsToUnderscores} from "@haulmont/jmix-react-core";

export function persistEntity<
  TEntity = unknown,
  TData extends Record<string, any> = Record<string, any>,
  TVariables = unknown
  >(
  upsertItem: GraphQLMutationFn<TData, TVariables>,
  upsertInputName: string,
  updatedEntity: TEntity,
  updateResultName: string,
  listQueryName: string,
  entityName: string,
  isNewEntity: boolean,
  goToParentScreen: () => void,
  intl: IntlShape,
  metadata: Metadata
) {
  upsertItem({
    variables: {
      [upsertInputName]: jmixFront_to_jmixGraphQL(updatedEntity, entityName, metadata)
    } as any,
    update(cache: ApolloCache<TData>, result: FetchResult<TData>) {
      const updateResult = result.data?.[updateResultName];
      // Reflect the update in Apollo cache
      cache.modify({
        fields: {
          [listQueryName](existingRefs = []) {
            const updatedItemRef = cache.writeFragment({
              id: `${entityName}:${updateResult.id}`,
              data: updatedEntity,
              fragment: gql(`
                      fragment New_${dollarsToUnderscores(entityName)} on ${dollarsToUnderscores(entityName)} {
                        id
                        type
                      }
                    `)
            });
            return [...existingRefs, updatedItemRef];
          }
        }
      });
    }
  }).then(action(({errors}: FetchResult<TData, Record<string, any>, Record<string, any>>) => {
    if (errors == null || errors.length === 0) {
      const successMessageId = selectFormSuccessMessageId(
        isNewEntity ? "create" : "edit"
      );
      message.success(intl.formatMessage({ id: successMessageId }));
      goToParentScreen();
    } else {
      console.error(errors);
      message.error(intl.formatMessage({ id: "common.requestFailed" }));
    }
  }))
    .catch((e: Error) => {
      console.error(e);
      message.error(intl.formatMessage({ id: "common.requestFailed" }));
    });
}
