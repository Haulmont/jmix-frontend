import {DataCollectionStore} from "@haulmont/jmix-react-core";
import queryString from "query-string"
import { defaultPaginationConfig } from "./config";

export interface PaginationConfigBase {
    current?: number;
    pageSize?: number,
    defaultPageSize?: number;
    showSizeChanger?: boolean;
    pageSizeOptions?: string[];
    disabled?: boolean
}

/**
 * Returns new PaginationConfig object with 'current' and 'pageSize' params, parsed from location.search.
 * If param not found in search url, previous value (currentPrev, pageSizePrev) will be returned.
 * If new pageSize not contains in config pageSizeOptions - previous config will be returned.
 *
 * @param locationSearch trying to find paging params here
 * @param currentPrev - previous value, will be returned in result if new value not found in locationSearch
 * @param pageSizePrev - previous value, will be returned in result if new value not found in locationSearch
 */
export function parsePagingParams(locationSearch: string,
                                  currentPrev: number | undefined,
                                  pageSizePrev: number | undefined): PaginationConfigBase {

  const parsedUrlQuery = queryString.parse(locationSearch);
  return {
    current: parseIntParam(parsedUrlQuery.page, currentPrev),
    pageSize: parseIntParam(parsedUrlQuery.pageSize, pageSizePrev)
  };
}

function parseIntParam(param: string | string[] | null | undefined, defaultValue: number | undefined): number | undefined {
  if (typeof param !== 'string') return defaultValue;
  const parsed = parseInt(param);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Add paging params at the end of url string.
 * Returns url with
 * Note - expects that url has no params, so this method add '?' before params.
 *
 * @param url - params will be added to this url
 * @param current - current page
 * @param pageSize - page size
 */
export function addPagingParams(url: string, current: number | undefined, pageSize: number | undefined): string {
  if (!current || !pageSize) return url;
  return `${url}?page=${current}&pageSize=${pageSize}`;
}

/**
 * Apply paginationConfig to collectionDataStore, reload dataStore if required
 *
 * @param pagination - PaginationConfig
 * @param dataCollection -page size and current page will be set to this collection data store
 * @param reload - reload collection data store, if needsr
 */
export function setPagination<E, P extends PaginationConfigBase>(pagination: P, dataCollection: DataCollectionStore<E>, reload: boolean = false) {
  const {disabled, pageSize, current} = pagination;

  if (disabled === true) {
    dataCollection.limit = null;
    dataCollection.offset = null;
    dataCollection.skipCount = true;
    if (reload) dataCollection.load();
    return;
  }

  // need to sync enabled pagination config and dataCollection - reset limit and offset
  if (dataCollection.skipCount) {
    dataCollection.skipCount = false;
  }

  if (pageSize && current) {
    dataCollection.limit = pageSize;
    dataCollection.offset = pageSize * (current - 1);
  }

  if (reload) dataCollection.load();
}


/**
 * @param urlParams query params from 'location.history'
 * @param disabled set to true, if no pagination required for component
 * @param prevConfig previous paging configuration, by default used Paging#defaultPagingConfig
 */
export function createPagingConfig<P extends PaginationConfigBase>(
    urlParams: string,
    disabled: boolean = false,
    prevConfig: P = (defaultPaginationConfig as P)
) {

  const config = {...prevConfig};
  if (disabled) {
    return {config, disabled: true};
  }

  const {current, pageSize, pageSizeOptions} = config;
  const parsedParams = parsePagingParams(urlParams, current, pageSize);

  // return prev config if pageSize param not match to options
  if (!pageSizeOptions || !parsedParams.pageSize || pageSizeOptions?.indexOf('' + parsedParams.pageSize) < 0) {
    return config;
  }

  return {...config, ...parsedParams};
}