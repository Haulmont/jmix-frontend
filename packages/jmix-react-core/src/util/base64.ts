export function base64encode(str: string): string {
  /* tslint:disable:no-string-literal */
  /* istanbul ignore else */
  if (typeof btoa === 'function') {
    return btoa(str);
  } else if (global['Buffer']) { // prevent Buffer from being injected by browserify
    return new global['Buffer'](str).toString('base64');
  } else {
    throw new Error('Unable to encode to base64');
  }
  /* tslint:enable:no-string-literal */
}