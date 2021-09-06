/**
 * This function tries its best to guess the display name for the entity instance.
 * You will likely want to replace the call to this function with your own implementation.
 *
 * @param entityInstance
 */
export function guessDisplayName(entityInstance: Record<string, unknown>): string {
  if ('name' in entityInstance) {
    return String(entityInstance.name);
  }
  if ('title' in entityInstance) {
    return String(entityInstance.title);
  }
  if ('caption' in entityInstance) {
    return String(entityInstance.caption);
  }
  if ('label' in entityInstance) {
    return String(entityInstance.label);
  }
  if ('summary' in entityInstance) {
    return String(entityInstance.summary);
  }
  if ('description' in entityInstance) {
    return String(entityInstance.description);
  }
  if ('firstName' in entityInstance && 'lastName' in entityInstance) {
    return String(`${entityInstance.firstName} ${entityInstance.lastName}`);
  }
  if ('firstName' in entityInstance) {
    return String(entityInstance.firstName);
  }
  if ('lastName' in entityInstance) {
    return String(entityInstance.lastName);
  }
  if ('id' in entityInstance) {
    return String(entityInstance.id);
  }
  return JSON.stringify(entityInstance);
}
