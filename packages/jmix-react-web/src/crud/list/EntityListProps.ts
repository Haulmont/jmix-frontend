import { EntityInstance } from "@haulmont/jmix-react-core";

export interface EntityListProps<TEntity = unknown> {
  onEntityListChange?: (entityList?: this['entityList']) => void;
  entityList?: Array<EntityInstance<TEntity>>;
  onSelectEntity?: (entityInstance?: EntityInstance<TEntity>) => void;
}
