import {PaginationConfig} from "antd/es/pagination";
import React from "react";
import queryString from "query-string"
import {Pagination} from "antd";
import {toJS} from "mobx";
import { TablePaginationConfig } from "antd/es/table";
import {PaginationChangeCallback} from "../table/DataTable";

type Props = {
  paginationConfig: PaginationConfig;
  total?: number,
  onPagingChange: (current: number, pageSize?: number) => void;
}

/**
 * Paging defaults
 */
export const defaultPagingConfig: PaginationConfig = {
  current: 1,
  pageSize: 10,
  defaultPageSize: 10,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '50', '100', '500', '1000', '5000']
};

export const defaultGridPagingConfig: PaginationConfig = {
  current: 1,
  pageSize: 12,
  defaultPageSize: 12,
  showSizeChanger: true,
  pageSizeOptions: ['12', '24', '48', '96', '240', '960', '4800']
};

/**
 * Ant Design Pagination component adopted to our List and DataCollectionStore
 */
export class Paging extends React.Component<Props> {

  render() {
    const {paginationConfig, total} = this.props;

    return (
      <Pagination
        {...paginationConfig}
        total={total}
        pageSizeOptions={toJS(paginationConfig.pageSizeOptions)}
        onChange={this.props.onPagingChange}
        onShowSizeChange={this.props.onPagingChange}
      />
    );
  }
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
                                  pageSizePrev: number | undefined): PaginationConfig {

  const parsedUrlQuery = queryString.parse(locationSearch);
  return {
    current: parseIntParam(parsedUrlQuery.page, currentPrev),
    pageSize: parseIntParam(parsedUrlQuery.pageSize, pageSizePrev)
  };
}

function parseIntParam(param: string | string[] | null | undefined, defaultValue: number | undefined): number | undefined {
  if (typeof param !== 'string') return defaultValue;
  const parsed = parseInt(param, 10);
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

// TODO docs
/**
 * Apply paginationConfig to collectionDataStore, reload dataStore if required
 *
 * @param pagination - PaginationConfig
 * @param dataCollection -page size and current page will be set to this collection data store
 * @param reload - reload collection data store, if needsr
 */
export function setPagination(pagination: PaginationConfig | TablePaginationConfig, onPaginationChange: PaginationChangeCallback) {

  const {disabled, pageSize, current} = pagination;

  if (disabled === true) {
    onPaginationChange({
      limit: null,
      offset: null,
      skipCount: true
    });
    // TODO reload?
    return;
  }

  if (pageSize && current) {
    onPaginationChange({
      limit: pageSize,
      offset: pageSize * (current - 1),
      skipCount: false
    });
  }

  // TODO reload? if (reload) dataCollection.load();
}


/**
 * @param urlParams query params from 'location.history'
 * @param disabled set to true, if no pagination required for component
 * @param prevConfig previous paging configuration, by default used Paging#defaultPagingConfig
 */
export function createPagingConfig(urlParams: string,
                                   disabled: boolean = false,
                                   prevConfig: PaginationConfig = defaultPagingConfig) {

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