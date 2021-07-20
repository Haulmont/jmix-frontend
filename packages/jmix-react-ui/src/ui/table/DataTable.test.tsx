import '@testing-library/jest-dom';
import {create, ReactTestInstance} from 'react-test-renderer';
import React from 'react';
import {DataTable} from "./DataTable";
import {IntlProvider} from "react-intl";
import { Provider } from 'mobx-react';
import { MainStore } from '@haulmont/jmix-react-core';

const noop = () => {
  // Do nothing
};

const mainStore = new MainStore(
  {} as any,
  {onLocaleChange: jest.fn()} as any
);

mainStore.isEntityDataLoaded = () => true;

// used by antd <Table>
window.matchMedia = () => ({
  addListener: jest.fn(),
  removeListener: jest.fn()
}) as any;

describe('<DataTable>', () => {
  const dataTableTestRenderer = create(
    <Provider mainStore={mainStore}>
      <IntlProvider locale='en'>
        <DataTable loading={false}
                   onFilterChange={noop}
                   onSortOrderChange={noop}
                   onPaginationChange={noop}
                   entityName={'scr_Car'}
                   columnDefinitions={[
                     'manufacturer',
                     'model'
                   ]}
                   items={[
                     {manufacturer: 'AAA', model: '001', id: '1'},
                     {manufacturer: 'BBB', model: '002', id: '2'},
                   ]}
                   count={2}
        />
      </IntlProvider>
    </Provider>
  );

  const dataTableTestInstance = dataTableTestRenderer.root;

  const intlComponent = dataTableTestInstance.children[0] as ReactTestInstance;
  const mainStoreComponent = intlComponent.children[0] as ReactTestInstance;
  const metadataComponent = mainStoreComponent.children[0] as ReactTestInstance;
  const observerComponent = metadataComponent.children[0] as ReactTestInstance;
  const dataTableComponent = observerComponent.children[0] as ReactTestInstance;


  it('renders',  () => {
    expect(dataTableTestInstance).not.toBeNull();
  });

  it('wrapper has a DataTable child that has a selectedRowKeys property', () => {
    expect(dataTableComponent.instance.selectedRowKeys).not.toBeUndefined();
  })

  it('selectedRowKeys must be an empty array', () => {
    expect(dataTableComponent.instance.selectedRowKeys).toBeInstanceOf(Array);
    expect(dataTableComponent.instance.selectedRowKeys).toHaveLength(0);
  })

  it('DataTable.onRowSelectionChange must be called once after click on the row', async () => {
    // Find the rows
    const rows = dataTableComponent.findAllByProps({className: 'ant-table-row ant-table-row-level-0'})

    expect(dataTableComponent.instance.disposers.length).toBeGreaterThanOrEqual(1);
    const prevSelectedRowKeys = [...dataTableComponent.instance.selectedRowKeys];
    expect(prevSelectedRowKeys).toHaveLength(0);

    rows[0].props.onClick(new Event('click'))
    const newSelectedRowKeys = dataTableComponent.instance.selectedRowKeys;
    expect(prevSelectedRowKeys).not.toEqual(newSelectedRowKeys);
    expect(newSelectedRowKeys).toHaveLength(1);
  })

  it('DataTable.items must be the same after click on the row (row selection)', () => {
    const prevItems = dataTableComponent.instance.items;

    const rows = dataTableComponent.findAllByProps({className: 'ant-table-row ant-table-row-level-0'});
    rows[0].props.onClick(new Event('click'));

    expect(dataTableComponent.instance.items === prevItems).toBe(true);
  })
});