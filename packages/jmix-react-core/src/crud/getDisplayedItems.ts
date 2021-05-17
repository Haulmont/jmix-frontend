import {calcOffset, JmixPagination} from "./pagination";
import {JmixSortOrder} from "./sort";
import {JmixEntityFilter} from "./filter";
import { MayHaveId } from "../util/metadata";

export function getDisplayedItems(
  entityList: MayHaveId[],
  pagination?: JmixPagination,
  /**
   * TODO Not implemented yet
   */
  _sortOrder?: JmixSortOrder,
  /**
   * TODO Not implemented yet
   */
  _filter?: JmixEntityFilter
): MayHaveId[] {
  const {current, pageSize} = pagination ?? {};

  const offset = calcOffset(current, pageSize);
  const limit = pageSize;

  if (offset != null && limit != null) {
    return entityList.slice(offset, offset + limit);
  }

  return entityList;
}