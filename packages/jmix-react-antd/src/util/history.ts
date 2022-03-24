import {addPagingParams} from "@haulmont/jmix-react-web";
import {JmixPagination, redirect} from "@haulmont/jmix-react-core";

export function saveHistory(routingPath: string, pagination?: JmixPagination) {
  const {current, pageSize} = pagination ?? {};
  redirect(addPagingParams(routingPath, current, pageSize))
}
