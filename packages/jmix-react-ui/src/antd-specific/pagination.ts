import {PaginationConfig} from "antd/es/pagination";
import {TablePaginationConfig} from "antd/es/table";
import { JmixPagination } from "../crud/interfaces";

export function convertPaginationAntd2Jmix(pagination: PaginationConfig | TablePaginationConfig): JmixPagination {
  const {pageSize, current} = pagination;

  if (pageSize != null && current != null) {
    return {
      limit: pageSize,
      offset: pageSize * (current - 1)
    };
  }

  return {};
}