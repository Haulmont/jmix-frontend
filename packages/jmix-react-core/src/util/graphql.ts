import {dollarsToUnderscores} from "./dollars-to-underscores";

export function getListQueryName(entityName: string): string {
  return `${dollarsToUnderscores(entityName)}List`;
}

export function getCountQueryName(entityName: string): string {
  return `${dollarsToUnderscores(entityName)}Count`;
}