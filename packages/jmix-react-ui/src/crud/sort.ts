export type JmixSortOrder = {[key: string]: 'ASC' | 'DESC'};

export type SortOrderChangeCallback = (sortOrder?: JmixSortOrder) => void