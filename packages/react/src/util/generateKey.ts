/**
 * A simple, zero-dependency function for creating random strings.
 * You may prefer to use UUID v4 instead.
 */
export function generateKey() {
  return String(window.crypto.getRandomValues(new Uint32Array(1))[0]);
}