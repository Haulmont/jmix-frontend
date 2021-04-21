import {PaginationConfig} from "antd/es/pagination";
import {TablePaginationConfig} from "antd/es/table";
import { JmixPagination } from "../crud/interfaces";

export function convertPaginationAntd2Jmix(pagination: PaginationConfig | TablePaginationConfig): JmixPagination {
  const {disabled, pageSize, current} = pagination;

  if (disabled) {
    return {};
  }

  if (pageSize != null && current != null) {
    return {
      limit: pageSize,
      offset: pageSize * (current - 1)
    };
  }

  return {};
}