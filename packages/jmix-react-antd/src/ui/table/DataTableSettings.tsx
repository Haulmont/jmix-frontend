import { SettingOutlined } from '@ant-design/icons';
import { Button, Checkbox, List, Popover } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useIntl } from 'react-intl';

export interface DataTableSettingsProps<TEntity> {
  columns?: ColumnsType<TEntity>;
  fieldsVisibility: Map<string, boolean>;
  onChange: (key: string, value: boolean) => void;
}

export const DataTableSettings = observer(<T, >({
  columns,
  fieldsVisibility,
  onChange
}: DataTableSettingsProps<T>) => {
  const intl = useIntl();
  const content = <List
    dataSource={columns}
    renderItem={item => (
      <List.Item>
        <Checkbox
            checked = {fieldsVisibility.get(item.key as string)}
            onChange={ev => onChange(item.key as string, ev.target.checked)}
        >
          {item.title}
        </Checkbox>
      </List.Item>
    )}
  />;

  return <Popover
    placement="bottom"
    title={intl.formatMessage({id: 'jmix.dataTable.fieldsVisibility'})}
    content={content} 
    trigger="click"
  >
    <Button>
      <SettingOutlined />
    </Button>
  </Popover>
})

export const getInitFieldVisibility = (
  appName: string,
  allFields: Array<string | undefined>,
  tableId: string,
  defaultVisibleColumns?: string[]
) => {
  const jsonString = localStorage.getItem(getLsKey(appName, tableId));
  const source = jsonString != null
    ? JSON.parse(jsonString)
    : defaultVisibleColumns ?? allFields;

  const res = new Map();

  source.forEach((key: string) => {
    res.set(key, true);
  });

  return res;
}

export const saveFieldsVisibility = (
  appName: string,
  fieldsVisibility: Map<string, boolean>,
  tableId: string
) => {
  const visibleKeys = Array.from(fieldsVisibility.entries())
    .filter(([_, isVisible]) => isVisible)
    .map(([key]) => key);

  localStorage.setItem(
    getLsKey(appName, tableId),
    JSON.stringify(visibleKeys)
  );
}

function getLsKey(appName: string, tableId: string) {
  return `${appName}-${tableId}-FieldVisibility`;
}
