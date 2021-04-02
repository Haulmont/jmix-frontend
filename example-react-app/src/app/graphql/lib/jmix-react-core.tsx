import {MutationFunctionOptions, QueryLazyOptions} from "@apollo/client/react/types/types";
import {OperationVariables} from "@apollo/client/core";
import {FetchResult} from "@apollo/client/link/core";

// Contents of this file will be moved to jmix-react-core lib

export interface EntityInstanceProps {
  __typename: string;
  _instanceName: string;
  id: string; // TODO perhaps we should have id as _id
}

// Similar to SerializedEntity
export declare type EntityInstance<T> = EntityInstanceProps & T;

// Aliases of Apollo types
export type GraphQLQuery = (options?: QueryLazyOptions<OperationVariables>) => void;
export type GraphQLMutation = (options?: MutationFunctionOptions) => Promise<FetchResult>;

export function getFields<T>(
  item: EntityInstance<T>,
): string[] {
  const ignoredProperties = ["__typename", "_instanceName", "id"];
  return Object.keys(item).filter(key => !ignoredProperties.includes(key));
}

export function addIdIfExistingEntity(entityId: string, isNewEntity: boolean) {
  return isNewEntity
    ? undefined
    : { id: entityId };
}
