import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker, {PickerProps} from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style/index';

export type DatePickerProps = PickerProps<Dayjs>

export const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);
