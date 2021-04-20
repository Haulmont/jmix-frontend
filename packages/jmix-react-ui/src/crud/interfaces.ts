export interface JmixPagination {
  limit?: number;
  offset?: number;
}

export type JmixSortOrder = {[key: string]: 'ASC' | 'DESC'};

export type JmixEntityFilter = {
  [key: string]: any
};
