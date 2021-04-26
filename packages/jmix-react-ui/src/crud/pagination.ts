import {PaginationConfig} from "antd/es/pagination";
import {TablePaginationConfig} from "antd/es/table";
import {addPagingParams} from "../ui/paging/Paging";

export interface LimitAndOffset {
  limit?: number;
  offset?: number;
}

export function getLimitAndOffset(pagination: PaginationConfig | TablePaginationConfig): LimitAndOffset {
  const {disabled, pageSize, current} = pagination;

  if (disabled) {
    return {};
  }

  if (pageSize != null && current != null) {
    return {
      limit: pageSize,
      offset: pageSize * (current - 1)
    };
  }

  return {};
}



export type PaginationChangeCallback = (pagination: LimitAndOffset) => void;

export function saveHistory(routingPath: string, pagination?: LimitAndOffset) {
  const {limit, offset} = pagination ?? {};

  const pageSize = limit;
  let current;
  if (offset != null && limit != null) {
    current = offset / limit + 1;
  }

  window.history.pushState({}, '', addPagingParams(routingPath, current, pageSize));
}