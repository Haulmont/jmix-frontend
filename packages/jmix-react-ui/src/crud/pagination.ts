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
  total?: number;
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

export type PaginationChangeCallback = (pagination: JmixPagination) => void;

export function saveHistory(routingPath: string, pagination?: JmixPagination) {
  const {current, pageSize} = pagination ?? {};
  window.history.pushState({}, '', addPagingParams(routingPath, current, pageSize));
}