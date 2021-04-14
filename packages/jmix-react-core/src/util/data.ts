import { base64encode } from "./base64";

export const TEMPORARY_ENTITY_ID_PREFIX = '_CUBA_TEMPORARY_ENTITY_ID_';

export const generateTemporaryEntityId = () => TEMPORARY_ENTITY_ID_PREFIX + Math.random().toString().slice(2);

export function toIdString(id: string | object) : string {
  return typeof id === "object" ? base64encode(JSON.stringify(id)) : id;
}