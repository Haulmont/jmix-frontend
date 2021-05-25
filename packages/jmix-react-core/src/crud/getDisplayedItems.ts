import {JmixPagination, paginate} from "./pagination";
import {JmixSortOrder} from "./sort";
import {JmixEntityFilter} from "./filter";
import {EntityInstance} from "./EntityInstance";

export function getDisplayedItems(
  entityList: EntityInstance[],
  pagination?: JmixPagination,
  /**
   * TODO Not implemented yet
   */
  _sortOrder?: JmixSortOrder,
  /**
   * TODO Not implemented yet
   */
  _filter?: JmixEntityFilter
): EntityInstance[] {
  // TODO Client-side filtering https://github.com/Haulmont/jmix-frontend/issues/306
  // TODO Client-side sorting https://github.com/Haulmont/jmix-frontend/issues/307
  return paginate(entityList, pagination);
}

