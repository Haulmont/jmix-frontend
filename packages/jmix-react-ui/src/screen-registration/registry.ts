import {RegisteredScreen} from "./screen-registration";

/**
 * @internal
 */
export const screenRegistry = new Map<string, RegisteredScreen>();

/**
 * @internal
 */
export const entityEditorRegistry = new Map<string, string>();

/**
 * @internal
 */
export const entityListRegistry = new Map<string, string>();
