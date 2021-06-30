import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react'
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
  it('renders', async () => {
    render(
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
    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();
  });
});