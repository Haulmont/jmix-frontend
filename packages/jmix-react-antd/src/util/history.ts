import {addPagingParams} from "@haulmont/jmix-react-web";
import {JmixPagination} from "@haulmont/jmix-react-core";

export function saveHistory(routingPath: string, pagination?: JmixPagination) {
  const {current, pageSize} = pagination ?? {};
  window.history.pushState({}, '', addPagingParams(routingPath, current, pageSize));
}
