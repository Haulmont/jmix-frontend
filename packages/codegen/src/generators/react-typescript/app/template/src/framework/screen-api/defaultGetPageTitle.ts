export function defaultGetPageTitle(
  appTitle: string,
  tabCaption?: string,
  breadcrumbCaption?: string,
): string {
  let pageTitle = appTitle;
  if (tabCaption != null) {
    pageTitle += ` / ${tabCaption}`;
  }
  if (breadcrumbCaption != null && breadcrumbCaption !== tabCaption) {
    pageTitle += ` / ${breadcrumbCaption}`;
  }
  return pageTitle;
}