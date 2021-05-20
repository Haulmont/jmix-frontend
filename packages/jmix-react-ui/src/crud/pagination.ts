import {PaginationConfig} from "antd/es/pagination";
import {TablePaginationConfig} from "antd/es/table";
import {addPagingParams} from "../ui/paging/Paging";

export interface LimitAndOffset {
  limit?: number;
  offset?: number;
}

export interface JmixPagination {
  current?: number;
  pageSize?: number;
}

export function getLimitAndOffset(pagination: PaginationConfig | TablePaginationConfig): LimitAndOffset {
  const {disabled, pageSize, current} = pagination;

  if (disabled) 
    return {};
  

  return {
    limit: pageSize,
    offset: calcOffset(current, pageSize)
  };
}

export function calcOffset(current?: number, pageSize?: number): number | undefined {
  if (current == null || pageSize == null) 
    return undefined;
  

  return pageSize * (current - 1);
}

export type PaginationChangeCallback = (current?: number, pageSize?: number) => void;

export function saveHistory(routingPath: string, pagination?: JmixPagination) {
  const {current, pageSize} = pagination ?? {};
  window.history.pushState({}, '', addPagingParams(routingPath, current, pageSize));
}