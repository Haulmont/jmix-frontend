export function getScreenKey(pathname: string): string | undefined {
  return pathname.split(/[/?]/)?.[1];
}