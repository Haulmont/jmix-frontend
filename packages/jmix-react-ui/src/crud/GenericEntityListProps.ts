import { EntityInstance } from "@haulmont/jmix-react-core";

export interface GenericEntityListProps<TEntity> {
  onEntityListChange?: (entityList?: this['entityList']) => void;
  entityList?: Array<EntityInstance<TEntity>>;
}