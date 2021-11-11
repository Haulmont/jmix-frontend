import {applyDataTransferFormat, getDateProperty, getPropertyInfo, HasId, ListQueryVars, TemporalPropertyType, useMetadata} from "@haulmont/jmix-react-core";
import { useEffect, useState, useMemo } from "react";
import { 
  useEntityList,
  EntityListHookOptions,
  EntityListHookResult,
} from "@haulmont/jmix-react-web";
import dayjs, { Dayjs } from 'dayjs';
import { runInAction } from "mobx";
import { CalendarEvent } from "./Calendar";

export interface CalendarHookOptions<TEntity, TData, TQueryVars, TMutationVars>
extends EntityListHookOptions<TEntity, TData, TQueryVars, TMutationVars> {
  eventStartDayPropertyName: keyof TEntity;
  eventEndDayPropertyName: keyof TEntity;
  eventTitlePropertyName: keyof TEntity;
  eventDescriptionPropertyName: keyof TEntity;
}

export interface CalendarHookResult<TEntity, TData, TQueryVars, TMutationVars>
extends EntityListHookResult<TEntity, TData, TQueryVars, TMutationVars> {
  events?: CalendarEvent[];
  currentMonthDayjs: Dayjs;
  setCurrentMonthDayjs: (date: Dayjs) => void;
  handleCalendarPaginationChange: (date: Dayjs) => void;
}

export function useCalendar<
  TEntity = unknown,
  TData extends Record<string, any> = Record<string, any>,
  TQueryVars extends ListQueryVars = ListQueryVars,
  TMutationVars extends HasId = HasId
>(
    options: CalendarHookOptions<TEntity, TData, TQueryVars, TMutationVars>
): CalendarHookResult<TEntity, TData, TQueryVars, TMutationVars> {
  const {
    entityName,
    eventStartDayPropertyName,
    eventEndDayPropertyName,
    eventTitlePropertyName,
    eventDescriptionPropertyName,
  } = options;

  const entityListData = useEntityList<TEntity, TData, TQueryVars, TMutationVars>({...options, paginationConfig: {}});
  
  const { entityListState, items } = entityListData;

  const [currentMonthDayjs, setCurrentMonthDayjs] = useState(dayjs());
  const {entities} = useMetadata();

  const events = useMemo(() =>
    items?.map(mapperItemToEvent({
      entityName,
      eventStartDayPropertyName,
      eventEndDayPropertyName,
      eventTitlePropertyName,
      eventDescriptionPropertyName,
    })
  ), [
    entityName,
    eventStartDayPropertyName,
    eventEndDayPropertyName,
    eventTitlePropertyName,
    eventDescriptionPropertyName,
    items,
  ]);

  useEffect(() => {
    const startPropInfo = getPropertyInfo(entities, entityName, eventStartDayPropertyName as string);
    const endPropInfo = getPropertyInfo(entities, entityName, eventEndDayPropertyName as string);

    const startDateBorder = dayjs(currentMonthDayjs.startOf('month')).subtract(2, 'week');
    const endDateBorder = dayjs(currentMonthDayjs.endOf('month')).add(2, 'week');

    runInAction(() => {
      // Set filters for getting entities at end of previous month (-2 weeks), at current month, and at start of next month (+2 weeks)
      entityListState.filter = [
        {[eventStartDayPropertyName]: {_gte: applyDataTransferFormat(startDateBorder, startPropInfo?.type as TemporalPropertyType)}},
        {[eventEndDayPropertyName]: {_lte: applyDataTransferFormat(endDateBorder, endPropInfo?.type as TemporalPropertyType)}}
      ];
    });
  }, [currentMonthDayjs, entities, entityListState, entityName, eventEndDayPropertyName, eventStartDayPropertyName]);

  const handleCalendarPaginationChange = setCurrentMonthDayjs;

  return {
      ...entityListData,
      currentMonthDayjs,
      setCurrentMonthDayjs,
      handleCalendarPaginationChange,
      events,
  };
}

function mapperItemToEvent<TEntity = unknown>({
  entityName,
  eventStartDayPropertyName,
  eventEndDayPropertyName,
  eventTitlePropertyName,
  eventDescriptionPropertyName,
}: {
  entityName: string,
  eventStartDayPropertyName: keyof TEntity,
  eventEndDayPropertyName: keyof TEntity,
  eventTitlePropertyName: keyof TEntity,
  eventDescriptionPropertyName: keyof TEntity,
}): (item: TEntity) => CalendarEvent {
  return (item) => {
    const startDay = getDateProperty<TEntity>(
      entityName,
      item,
      eventStartDayPropertyName
    );
    const endDay = getDateProperty<TEntity>(
      entityName,
      item,
      eventEndDayPropertyName
    );
    const title = item[eventTitlePropertyName] as any as string;
    const description = item[eventDescriptionPropertyName] as any as string | undefined;

    if (startDay == null) throw new Error('Event start day is undefinded');
    if (title == null) throw new Error('Event title is undefinded');

    return {
      startDay,
      endDay: endDay || startDay,
      title,
      description,
    }
  }
}
