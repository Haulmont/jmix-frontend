import { instanceItemToFormFields, Metadata } from "@haulmont/jmix-react-core";

/**
 * Reformats the entity data so that it can be
 * properly displayed by Ant Design `<Form>`.
 *
 * @typeparam T - entity type.
 *
 * @param item
 * @param entityName
 * @param metadata
 * @param stringIdName
 */
export function jmixFront_to_ant<T>(
  item: Record<string, any>,
  entityName: string,
  metadata: Metadata,
  stringIdName?: string
): Record<string, any> {
  // TODO Move instanceItemToFormFields from react-core to react-ui, call it `restToAntForm`, and extract the common functionality into a separate function
  return instanceItemToFormFields<T>(item, entityName, metadata.entities, undefined, stringIdName);
}