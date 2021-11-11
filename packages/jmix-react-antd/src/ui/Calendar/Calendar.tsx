import React from 'react';
import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generateCalendar, { CalendarProps as CalendarPropsAntd } from 'antd/es/calendar/generateCalendar';
import 'antd/es/calendar/style';
import { CalendarHeader } from './CalendarHeader';
import { Badge, Tooltip, List } from 'antd';

export type CalendarDayjsPropsAntd = CalendarPropsAntd<Dayjs>;

export const CalendarDayjsAntd = generateCalendar<Dayjs>(dayjsGenerateConfig);

export interface CalendarEvent {
  startDay: Dayjs;
  endDay: Dayjs;
  description?: string;
  title: string;
}
export interface CalendarProps extends CalendarDayjsPropsAntd {
  events: CalendarEvent[];
}

interface CalendarEventProps {
  event: CalendarEvent;
}
const CalendarEvent = ({ event }: CalendarEventProps) => (
  <div title="">
    <Tooltip title={event.description}>
      <Badge status="default" text={event.title} />
    </Tooltip>
  </div>
);

export const Calendar = ({events, ...props}: CalendarProps) => (
  <CalendarDayjsAntd
    headerRender={props => <CalendarHeader {...props} />}
    dateCellRender={date => (
      <List size="small">
        {events
          .filter(({startDay, endDay}) => 
            date.isAfter(startDay?.startOf("day")) &&
            date.isBefore(endDay?.endOf("day"))
          )
          .map(event => (
            <List.Item key={event.title}>
              <CalendarEvent event={event} />
            </List.Item>
          ))
        }
      </List>
    )}
    {...props}
  />
);
