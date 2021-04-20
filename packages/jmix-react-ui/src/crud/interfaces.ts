export interface JmixPagination {
  limit?: number;
  offset?: number;
}

export type JmixSortOrder = {[key: string]: 'ASC' | 'DESC'};

export type JmixEntityFilter = {
  [key: string]: any
};

export type FilterChangeCallback = (filter?: JmixEntityFilter) => void;
export type SortOrderChangeCallback = (sortOrder?: JmixSortOrder) => void
export type PaginationChangeCallback = (pagination: JmixPagination) => void;