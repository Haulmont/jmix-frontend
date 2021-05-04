export type JmixSortOrder = {[key: string]: 'ASC' | 'DESC' | JmixSortOrder};

export type SortOrderChangeCallback = (sortOrder?: JmixSortOrder) => void