import { MayHaveId } from "@haulmont/jmix-react-core";

export interface GenericEntityListProps {
  onEntityListChange?: (entityList?: this['entityList']) => void;
  entityList?: MayHaveId[];
  count?: number;
}