import { gql } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import React, { ReactNode } from "react";
import {useEntityListData} from "./useEntityListData";
import {renderHook} from "@testing-library/react-hooks";
import {JmixEntityFilter} from "./filter";
import {JmixSortOrder} from "./sort";
import {JmixPagination} from "./pagination";

const LIST_QUERY = gql`
  query scr_CarList(
    $limit: Int
    $offset: Int
    $orderBy: [inp_scr_CarOrderBy]
    $filter: [inp_scr_CarFilterCondition]
  ) {
    scr_CarCount
    scr_CarList(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) {
      id
      _instanceName
    }
    scr_GarageList {
      id
      _instanceName
    }
  }
`;

const data = {
  scr_CarList: [
    {
      id: '1',
      _instanceName: 'AAA - 001',
    },
    {
      id: '2',
      _instanceName: 'BBB - 002',
    },
  ],
  scr_CarCount: 2,
  scr_GarageList: [
    {
      id: '101',
      _instanceName: 'XXX',
    },
    {
      id: '102',
      _instanceName: 'YYY'
    }
  ]
};

const APOLLO_MOCKS = [
  {
    request: {
      query: LIST_QUERY,
      variables: {},
    },
    result: {
      data
    }
  }
];

const wrapper = ({children}: {children: ReactNode}) => <MockedProvider mocks={APOLLO_MOCKS}>{children}</MockedProvider>;

describe('useEntityListData()', () => {
  it('basic usage', async () => {
    const {result, waitForValueToChange} = renderHook(() => useEntityListData({
      entityName: 'scr_Car',
      listQuery: LIST_QUERY
    }), {wrapper});

    expect(result.current.items).toBeUndefined();
    expect(result.current.count).toBeUndefined();
    expect(result.current.listQueryResult.called).toEqual(false);
    expect(result.current.relationOptions).toBeUndefined();
    expect(result.current.executeListQuery).toBeDefined();

    await waitForValueToChange(() => result.current.items);

    expect(result.current.items?.length).toBe(2);
    expect(result.current.items?.[0].id).toEqual('1');
    expect(result.current.items?.[0]._instanceName).toEqual('AAA - 001');
    expect(result.current.items?.[1].id).toEqual('2');
    expect(result.current.items?.[1]._instanceName).toEqual('BBB - 002');

    expect(result.current.count).toEqual(2);

    expect(result.current.relationOptions?.size).toEqual(2);
    expect(result.current.relationOptions?.get('scr_Garage')?.[0].id).toEqual('101');
    expect(result.current.relationOptions?.get('scr_Garage')?.[1].id).toEqual('102');

    expect(result.current.listQueryResult.called).toEqual(true);
    expect(result.current.listQueryResult.data).toEqual(APOLLO_MOCKS[0].result.data);
  });

  it('uses provided entityList', async () => {
    const {result} = renderHook(() => useEntityListData({
      entityName: 'scr_Car',
      listQuery: LIST_QUERY,
      entityList: [
        {id: '3', _instanceName: 'CCC - 003'},
        {id: '4', _instanceName: 'DDD - 004'},
        {id: '5', _instanceName: 'EEE - 005'},
      ]
    }), {wrapper});

    expect(result.current.items?.length).toEqual(3);
    expect(result.current.items?.[0].id).toEqual('3');
    expect(result.current.items?.[0]._instanceName).toEqual('CCC - 003');

    expect(result.current.count).toEqual(3);
  });

  it('uses provided listQueryOptions', async () => {
    const spy = jest.fn();

    const {result, waitForValueToChange} = renderHook(() => useEntityListData({
      entityName: 'scr_Car',
      listQuery: LIST_QUERY,
      listQueryOptions: {
        onCompleted: spy
      }
    }), {wrapper});

    await waitForValueToChange(() => result.current.items);

    expect(spy).toHaveBeenCalled();
  });

  it('uses provided filter', async () => {
    const filter: JmixEntityFilter = {
      _instanceName: {
        _contains: 'A'
      }
    };

    const {result, waitForNextUpdate} = renderHook(() => useEntityListData({
      entityName: 'scr_Car',
      listQuery: LIST_QUERY,
      filter
    }), {wrapper});

    await waitForNextUpdate();

    expect(result.current.listQueryResult.variables.filter).toEqual(filter);
  });

  it('uses provided sort order', async () => {
    const sortOrder: JmixSortOrder[] = [{
      _instanceName: 'ASC'
    }];

    const {result, waitForNextUpdate} = renderHook(() => useEntityListData({
      entityName: 'scr_Car',
      listQuery: LIST_QUERY,
      sortOrder
    }), {wrapper});

    await waitForNextUpdate();

    expect(result.current.listQueryResult.variables.orderBy).toEqual(sortOrder);
  });

  it('uses provided pagination', async () => {
    const pagination: JmixPagination = {
      current: 1,
      pageSize: 20
    };

    const {result, waitForNextUpdate} = renderHook(() => useEntityListData({
      entityName: 'scr_Car',
      listQuery: LIST_QUERY,
      pagination
    }), {wrapper});

    await waitForNextUpdate();

    expect(result.current.listQueryResult.variables.limit).toEqual(20);
    expect(result.current.listQueryResult.variables.offset).toEqual(0);
  });

  it('does not execute query automatically when lazyLoading is true', async () => {
    const {result, waitForNextUpdate} = renderHook(() => useEntityListData({
      entityName: 'scr_Car',
      listQuery: LIST_QUERY,
      lazyLoading: true,
    }), {wrapper});

    // Let waitForNextUpdate to timeout
    try {
      await waitForNextUpdate();
    } catch (e) {
      // Do nothing
    }

    expect(result.current.listQueryResult.called).toEqual(false);
  });

});
