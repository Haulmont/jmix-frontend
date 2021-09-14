import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generateCalendar, { CalendarProps as CalendarPropsAntd } from 'antd/es/calendar/generateCalendar';
import 'antd/es/calendar/style';

export type CalendarProps = CalendarPropsAntd<Dayjs>;

export const Calendar = generateCalendar<Dayjs>(dayjsGenerateConfig);
