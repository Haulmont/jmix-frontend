import {applyDataTransferFormat, getPropertyInfo, HasId, ListQueryVars, TemporalPropertyType, useMetadata} from "@haulmont/jmix-react-core";
import { useEffect, useState } from "react";
import { 
  useEntityList,
  EntityListHookOptions,
  EntityListHookResult,
} from "@haulmont/jmix-react-web";
import dayjs, { Dayjs } from 'dayjs';
import { runInAction } from "mobx";

export interface CalendarHookOptions<TEntity, TData, TQueryVars, TMutationVars>
extends EntityListHookOptions<TEntity, TData, TQueryVars, TMutationVars> {
  eventStartPropertyName: keyof TEntity;
  eventEndPropertyName: keyof TEntity;
}

export interface CalendarHookResult<TEntity, TData, TQueryVars, TMutationVars>
extends EntityListHookResult<TEntity, TData, TQueryVars, TMutationVars> {
  handleCalendarPaginationChange: (date: Dayjs) => void;
  currentMonthDayjs: Dayjs;
  setCurrentMonthDayjs: (date: Dayjs) => void;
}

export function useCalendar<
  TEntity = unknown,
  TData extends Record<string, any> = Record<string, any>,
  TQueryVars extends ListQueryVars = ListQueryVars,
  TMutationVars extends HasId = HasId
>(
    options: CalendarHookOptions<TEntity, TData, TQueryVars, TMutationVars>
): CalendarHookResult<TEntity, TData, TQueryVars, TMutationVars> {
  const {entityName, eventStartPropertyName, eventEndPropertyName} = options;

  const entityListData = useEntityList<TEntity, TData, TQueryVars, TMutationVars>({...options, paginationConfig: {}});
  
  const { entityListState } = entityListData;

  const [currentMonthDayjs, setCurrentMonthDayjs] = useState(dayjs());
  const {entities} = useMetadata();

  useEffect(() => {
    const startPropInfo = getPropertyInfo(entities, entityName, eventStartPropertyName as string);
    const endPropInfo = getPropertyInfo(entities, entityName, eventEndPropertyName as string);

    const startDateBorder = dayjs(currentMonthDayjs.startOf('month')).subtract(2, 'week');
    const endDateBorder = dayjs(currentMonthDayjs.endOf('month')).add(2, 'week');

    runInAction(() => {
      // Set filters for getting entities at end of previous month (-2 weeks), at current month, and at start of next month (+2 weeks)
      entityListState.filter = [
        {[eventStartPropertyName]: {_gte: applyDataTransferFormat(startDateBorder, startPropInfo?.type as TemporalPropertyType)}},
        {[eventEndPropertyName]: {_lte: applyDataTransferFormat(endDateBorder, endPropInfo?.type as TemporalPropertyType)}}
      ];
    });
  }, [currentMonthDayjs, entities, entityListState, entityName, eventEndPropertyName, eventStartPropertyName]);

  const handleCalendarPaginationChange = setCurrentMonthDayjs;

  return {
      ...entityListData,
      currentMonthDayjs,
      setCurrentMonthDayjs,
      handleCalendarPaginationChange,
  };
}
