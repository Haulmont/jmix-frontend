import { gql } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import {act, renderHook } from "@testing-library/react-hooks";
import React from "react";
import { ReactNode } from "react";
import { useEntityList } from "./useEntityList";
import {IntlProvider} from "react-intl";
import {Screens, ScreensContext } from "@haulmont/jmix-react-core";

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

const DELETE_MUTATION = gql`
  mutation Delete_scr_Car($id: String!) {
    delete_scr_Car(id: $id)
  }
`;

const APOLLO_MOCKS = [
  {
    request: {
      query: LIST_QUERY,
      variables: {
        limit: 10,
        offset: 0
      },
    },
    result: {
      data
    }
  },
  {
    request: {
      query: DELETE_MUTATION,
      variables: {
        id: '1'
      }
    },
    result: {
      delete_scr_Car: null
    }
  }
];

const screens = new Screens();

const wrapper = ({children}: {children: ReactNode}) => (
  <IntlProvider locale={'en'}>
    <ScreensContext.Provider value={screens}>
      <MockedProvider mocks={APOLLO_MOCKS}>{children}</MockedProvider>
    </ScreensContext.Provider>
  </IntlProvider>
);

describe('useEntityList()', () => {
  it('basic usage', async () => {
    const {result, waitForValueToChange} = renderHook(() => useEntityList({
      listQuery: LIST_QUERY,
      entityName: 'scr_Car',
      routingPath: 'car',
    }), {wrapper});

    await waitForValueToChange(() => result.current.listQueryResult.called);
    await waitForValueToChange(() => result.current.listQueryResult.loading);

    expect(result.current.items?.[0].id).toEqual('1');
  });

  it('creates and executes delete mutation', async () => {
    const {result} = renderHook(() => useEntityList({
      listQuery: LIST_QUERY,
      entityName: 'scr_Car',
      routingPath: 'car',
    }), {wrapper});

    await act(async () => {
      await result.current.executeDeleteMutation({
        variables: {
          id: '1'
        }
      })
    });

    expect(result.current.deleteMutationResult.called).toEqual(true);
  });

  it('passing delete mutation explicitly', async () => {
    const {result} = renderHook(() => useEntityList({
      listQuery: LIST_QUERY,
      entityName: 'scr_Car',
      routingPath: 'car',
      deleteMutation: DELETE_MUTATION
    }), {wrapper});

    await act(async () => {
      await result.current.executeDeleteMutation({
        variables: {
          id: '1'
        }
      })
    });

    expect(result.current.deleteMutationResult.called).toEqual(true);
  });

  it('passing deleteMutationOptions', async () => {
    const spy = jest.fn();

    const {result} = renderHook(() => useEntityList({
      listQuery: LIST_QUERY,
      entityName: 'scr_Car',
      routingPath: 'car',
      deleteMutationOptions: {
        onCompleted: spy
      }
    }), {wrapper});

    await act(async () => {
      await result.current.executeDeleteMutation({
        variables: {
          id: '1'
        }
      })
    });

    expect(result.current.deleteMutationResult.called).toEqual(true);
    expect(spy).toHaveBeenCalled();
  });

  it('uses provided pagination config', async () => {
    const {result, waitForNextUpdate} = renderHook(() => useEntityList({
      listQuery: LIST_QUERY,
      entityName: 'scr_Car',
      routingPath: 'car',
      paginationConfig: {
        pageSize: 30,
        current: 7
      }
    }), {wrapper});

    await waitForNextUpdate();

    expect(result.current.entityListState.pagination?.current).toEqual(7);
    expect(result.current.entityListState.pagination?.pageSize).toEqual(30);
  });
})