import { instanceItemToFormFields, MetaClassInfo } from "@haulmont/jmix-react-core";

/**
 * Takes the data received from backend via GraphQL and reformats it so that it can be
 * properly displayed by Ant Design `<Form>`.
 *
 * @typeparam T - entity type.
 *
 * @param item
 * @param entityName
 * @param metadata
 * @param stringIdName
 */
export function graphqlToAntForm<T>(
  item: Record<string, any>,
  entityName: string,
  metadata: MetaClassInfo[],
  stringIdName?: string
): Record<string, any> {
  // TODO Move instanceItemToFormFields from react-core to react-ui, call it `restToAntForm`, and extract the common functionality into a separate function
  return instanceItemToFormFields<T>(item, entityName, metadata, undefined, stringIdName);
}