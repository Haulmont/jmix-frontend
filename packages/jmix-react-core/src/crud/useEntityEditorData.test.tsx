import {gql} from "@apollo/client";
import React, {ReactNode} from "react";
import {MockedProvider} from "@apollo/client/testing";
import {useEntityEditorData} from "./useEntityEditorData";
import { renderHook } from "@testing-library/react-hooks";

const LOAD_SCR_CAR = gql`
  query scr_CarById($id: String = "", $loadItem: Boolean!) {
    scr_CarById(id: $id) @include(if: $loadItem) {
      id
      _instanceName
      garage {
        id
        _instanceName
      }
    }
    scr_GarageList {
      id
      _instanceName
    }
  }
`;

const LOAD_NO_ASSOCIATIONS = gql`
  query scr_CarById($id: String = "", $loadItem: Boolean!) {
    scr_CarById(id: $id) @include(if: $loadItem) {
      id
      _instanceName
    }
  }
`;

const LOAD_SELF_REFERENCING_ASSOCIATIONS = gql`
  query scr_CarById($id: String = "", $loadItem: Boolean!) {
    scr_CarById(id: $id) @include(if: $loadItem) {
      id
      _instanceName
      predecessor {
        id
        _instanceName
      }
    }
    scr_CarList {
      id
      _instanceName
    }
  }
`;

const APOLLO_MOCKS = [
  {
    request: {
      query: LOAD_SCR_CAR,
      variables: {
        loadItem: false
      },
    },
    result: {
      data: {
        scr_GarageList: [
          {id: '100', _instanceName: 'XXX'},
          {id: '101', _instanceName: 'YYY'},
        ]
      }
    }
  },
  {
    request: {
      query: LOAD_SCR_CAR,
      variables: {
        id: '1',
        loadItem: true
      },
    },
    result: {
      data: {
        scr_CarById: {
          id: '1',
          _instanceName: 'AAA - 001',
          garage: {
            id: '100',
            _instanceName: 'XXX'
          }
        },
        scr_GarageList: [
          {id: '100', _instanceName: 'XXX'},
          {id: '101', _instanceName: 'YYY'},
        ]
      }
    }
  },
  {
    request: {
      query: LOAD_NO_ASSOCIATIONS,
      variables: {
        id: '1',
        loadItem: true
      },
    },
    result: {
      data: {
        scr_CarById: {
          id: '1',
          _instanceName: 'AAA - 001',
        },
      }
    }
  },
  {
    request: {
      query: LOAD_SELF_REFERENCING_ASSOCIATIONS,
      variables: {
        id: '1',
        loadItem: true
      },
    },
    result: {
      data: {
        scr_CarById: {
          id: '1',
          _instanceName: 'AAA - 001',
          predecessor: {
            id: '2',
            _instanceName: 'BBB - 002'
          }
        },
        scr_CarList: [
          {id: '1', _instanceName: 'AAA - 001'},
          {id: '2', _instanceName: 'BBB - 002'},
          {id: '3', _instanceName: 'CCC - 003'},
        ]
      }
    }
  },
];

const wrapper = ({children}: {children: ReactNode}) => <MockedProvider mocks={APOLLO_MOCKS} addTypename={false}>{children}</MockedProvider>;

describe('useEntityEditorData()', () => {
  it('loads entity', async () => {
    const {result, waitForValueToChange} = renderHook(() => useEntityEditorData({
      loadQuery: LOAD_SCR_CAR,
      entityName: 'scr_Car',
      entityId: '1'
    }), {wrapper});

    expect(result.current.item).toBeUndefined();
    expect(result.current.relationOptions).toBeUndefined();
    expect(result.current.executeLoadQuery).toBeDefined();
    expect(result.current.loadQueryResult.called).toEqual(false);

    await waitForValueToChange(() => result.current.loadQueryResult.called);
    await waitForValueToChange(() => result.current.loadQueryResult.loading);

    expect(result.current.item.id).toEqual('1');
    expect(result.current.item._instanceName).toEqual('AAA - 001');
    expect(result.current.relationOptions?.get('scr_Garage')?.length).toEqual(2);
    expect(result.current.relationOptions?.get('scr_Garage')?.[0].id).toEqual('100');

    expect(result.current.loadQueryResult.called).toEqual(true);
  });

  it('loads association options when entityId is not provided', async () => {
    const {result, waitForValueToChange} = renderHook(() => useEntityEditorData({
      loadQuery: LOAD_SCR_CAR,
      entityName: 'scr_Car',
    }), {wrapper});

    await waitForValueToChange(() => result.current.relationOptions);

    expect(result.current.item).toBeUndefined();
    expect(result.current.relationOptions?.get('scr_Garage')?.length).toEqual(2);
    expect(result.current.relationOptions?.get('scr_Garage')?.[0].id).toEqual('100');

    expect(result.current.loadQueryResult.called).toEqual(true);
  });

  it('handles self-referencing associations', async () => {
    const {result, waitForValueToChange} = renderHook(() => useEntityEditorData({
      loadQuery: LOAD_SELF_REFERENCING_ASSOCIATIONS,
      entityName: 'scr_Car',
      entityId: '1'
    }), {wrapper});

    await waitForValueToChange(() => result.current.item);

    expect(result.current.item.id).toEqual('1');
    expect(result.current.relationOptions?.size).toEqual(1);
    expect(result.current.relationOptions?.get('scr_Car')?.length).toEqual(2);
    expect(result.current.relationOptions?.get('scr_Car')?.find(x => x.id === '1')).toBeUndefined();
  });

  it('does not make a request if entityId is not provided and there are no association options queries', async () => {
    const {result, waitForValueToChange} = renderHook(() => useEntityEditorData({
      loadQuery: LOAD_NO_ASSOCIATIONS,
      entityName: 'scr_Car',
    }), {wrapper});

    // Allow waitForValueToChange to timout
    try {
      await waitForValueToChange(() => result.current.loadQueryResult.called);
    } catch (e) {
      // Do nothing
    }

    expect(result.current.item).toBeUndefined();
    expect(result.current.relationOptions).toBeUndefined();
  });

  it('response does not contain association options when there are no association options queries', async () => {
    const {result, waitForValueToChange} = renderHook(() => useEntityEditorData({
      loadQuery: LOAD_NO_ASSOCIATIONS,
      entityName: 'scr_Car',
      entityId: '1'
    }), {wrapper});

    await waitForValueToChange(() => result.current.item);

    expect(result.current.item.id).toEqual('1');
    expect(result.current.relationOptions?.size).toEqual(0);
  });

  it('uses provided entityInstance', async () => {
    const {result} = renderHook(() => useEntityEditorData({
      loadQuery: LOAD_SCR_CAR,
      entityName: 'scr_Car',
      entityInstance: {
        id: '7',
        _instanceName: 'VVV - 007'
      }
    }), {wrapper});

    expect(result.current.item.id).toEqual('7');
  });

  it('uses provided loadQueryOptions', async () => {
    const spy = jest.fn();

    const {result, waitForValueToChange} = renderHook(() => useEntityEditorData({
      loadQuery: LOAD_SCR_CAR,
      entityName: 'scr_Car',
      entityId: '1',
      loadQueryOptions: {
        onCompleted: spy
      }
    }), {wrapper});

    await waitForValueToChange(() => result.current.item);

    expect(spy).toHaveBeenCalled();
  });

});
