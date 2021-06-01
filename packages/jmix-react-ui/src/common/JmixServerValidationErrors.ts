export interface JmixServerValidationErrors {
  /**
   * Errors that are related to a single field.
   * Map between field `path` and arrays of error messages.
   */
  fieldErrors?: Map<string, string[]>;
  /**
   * Errors that are related to more than one field (e.g. cross-validation errors)
   * or not related to field values.
   */
  globalErrors?: string[];
}