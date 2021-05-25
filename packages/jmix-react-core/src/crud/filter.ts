// Most of these operators map directly to GraphQL backend schema, however, there are exceptions, such as '__inInterval' operator,
// which is represented as a combination of a `_lte` and a `_gte` filters.
// Such 'artificial' operators are identified by a double underscore prefix.
export type UuidComparisonType = '_eq' | '_neq' | '_in' | '_notIn' | '_isNull';
export type NumberComparisonType = '_eq' | '_neq' | '_gt' | '_gte' | '_lt' | '_lte' | '_in' | '_notIn' | '_isNull';
export type TextComparisonType = '_eq' | '_neq' | '_in' | '_notIn' | '_contains' | '_startsWith' | '_endsWith' | '_isNull';
export type TemporalComparisonType = '_eq' | '_neq' | '_gt' | '_gte' | '_lt' | '_lte' | '_in' | '_notIn' | '_isNull' | '__inInterval';
export type BooleanComparisonType = '_eq' | '_neq' | '_isNull';
export type ComparisonType = UuidComparisonType | NumberComparisonType | TextComparisonType | TemporalComparisonType | BooleanComparisonType;

export type JmixEntityFilter = {
  [key: string]: any
};

export type FilterChangeCallback = (filter?: JmixEntityFilter[]) => void;
