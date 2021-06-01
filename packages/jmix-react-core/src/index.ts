import dayjs from 'dayjs';
import customParseFormat  from 'dayjs/plugin/customParseFormat';
import advancedFormat  from 'dayjs/plugin/advancedFormat';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';

// configure dayjs for the 'rc-picker' library in both packages: core and ui
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

export * from './access-control/AccessControl';
export * from './access-control/AttrPermAccessControl';
export * from './access-control/EntityPermAccessControl';

export * from './app/Auth';
export * from './app/JmixAppProvider';
export * from './app/JmixServerError';
export * from './app/MainStore';
export * from './app/MenuConfig';
export * from './app/EventEmitter';
export * from './app/Router';
export * from './app/MetadataProvider';

export * from './crud/getDisplayedItems';
export * from './crud/getRelationOptions';
export * from './crud/useEntityListData';
export * from './crud/useEntityEditorData';
export * from './crud/filter';
export * from './crud/pagination';
export * from './crud/sort';

export * from './data/aliases';
export * from './data/DataContext';
export * from './crud/EntityInstance';
export * from './data/Collection';
export * from './data/Instance';
export * from './data/PropertyType';
export * from './data/Association';

export * from './util/collation';
export * from './util/dollars-to-underscores';
export * from './util/graphql';
export * from './util/metadata';
export * from './util/data';
export * from './util/file';
export * from './util/formats';
export * from './util/errorHandling';
export * from './util/stateManagement';
export * from './util/temp-id';
export * from './util/misc';
export * from './util/uncapitalize-first';
export * from './app/Screens';
export * from './app/Tabs';
export * from './util/normalizeMetadata';

export * from './conditional-rendering';
export * from './timer';
