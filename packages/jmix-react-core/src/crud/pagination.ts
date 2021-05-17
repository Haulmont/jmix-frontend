export interface LimitAndOffset {
  limit?: number;
  offset?: number;
}

export interface JmixPagination {
  current?: number;
  pageSize?: number;
}

export function getLimitAndOffset(pagination: JmixPagination): LimitAndOffset {
  const {pageSize, current} = pagination;

  return {
    limit: pageSize,
    offset: calcOffset(current, pageSize)
  };
}

export function calcOffset(current?: number, pageSize?: number): number | undefined {
  if (current == null || pageSize == null) {
    return undefined;
  }

  return pageSize * (current - 1);
}

export type PaginationChangeCallback = (current?: number, pageSize?: number) => void;
