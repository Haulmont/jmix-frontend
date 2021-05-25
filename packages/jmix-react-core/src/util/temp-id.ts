import { v4 as uuidv4 } from 'uuid';

export const TEMP_ID_PREFIX = 'TEMP_ID_';

export function generateTempId(): string {
  return TEMP_ID_PREFIX + uuidv4();
}

export function isTempId(id: string): boolean {
  return id.startsWith(TEMP_ID_PREFIX);
}