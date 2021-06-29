import React, { ReactNode } from "react";
import {MockedProvider} from "@apollo/client/testing";
import {act, renderHook} from "@testing-library/react-hooks";
import { useEntityEditor } from "./useEntityEditor";
import { gql } from "@apollo/client";
import {IntlProvider} from "react-intl";

jest.mock('@haulmont/jmix-react-core', () => ({
  ...jest.requireActual('@haulmont/jmix-react-core'),
  useMetadata: () => ({
    entities: [
      {
        entityName: 'scr_Car',
        className: 'Car',
        properties: [
          {
            name: 'id',
            type: 'string',
            attributeType: 'DATATYPE'
          },
          {
            name: 'manufacturer',
            type: 'string',
            attributeType: 'DATATYPE'
          }
        ]
      }
    ]
  })
}));

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

const UPSERT_SCR_CAR = gql`
  mutation Upsert_scr_Car($car: inp_scr_Car!) {
    upsert_scr_Car(car: $car) {
      id
    }
  }
`;

const APOLLO_MOCKS = [
  {
    request: {
      query: UPSERT_SCR_CAR,
      variables: {
        car: {
          id: '1',
          manufacturer: 'BBB'
        }
      }
    },
    result: {
      data: {
        upsert_scr_Car: {id: '1'}
      }
    }
  },
  {
    request: {
      query: UPSERT_SCR_CAR,
      variables: {
        car: {
          id: '5',
          manufacturer: 'SSS'
        }
      }
    },
    result: {
      data: {
        upsert_scr_Car: {id: '5'}
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
];

const wrapper = ({children}: {children: ReactNode}) => (
  <IntlProvider locale={'en'}>
    <MockedProvider mocks={APOLLO_MOCKS} addTypename={false}>{children}</MockedProvider>
  </IntlProvider>
);

describe('useEntityEditor()', () => {
  it('basic usage', async () => {
    const {result, waitForValueToChange} = renderHook(() => useEntityEditor({
      loadQuery: LOAD_SCR_CAR,
      upsertMutation: UPSERT_SCR_CAR,
      entityName: 'scr_Car',
      routingPath: 'car',
      entityId: '1'
    }), {wrapper});

    await waitForValueToChange(() => result.current.loadQueryResult.called);
    await waitForValueToChange(() => result.current.loadQueryResult.loading);

    expect(result.current.item.id).toEqual('1');
  });

  it('uses provided mutation', async () => {
    const {result} = renderHook(() => useEntityEditor({
      loadQuery: LOAD_SCR_CAR,
      upsertMutation: UPSERT_SCR_CAR,
      entityName: 'scr_Car',
      routingPath: 'car',
      entityId: '1'
    }), {wrapper});

    await act(async () => {
      await result.current.executeUpsertMutation({
        variables: {
          car: {
            id: '1',
            manufacturer: 'BBB'
          }
        }
      })
    });

    expect(result.current.upsertMutationResult.called).toEqual(true);
    expect(result.current.upsertMutationResult.data.upsert_scr_Car.id).toEqual('1');
  });

  it('uses provided upsertMutationOptions', async () => {
    const spy = jest.fn();

    const {result} = renderHook(() => useEntityEditor({
      loadQuery: LOAD_SCR_CAR,
      upsertMutation: UPSERT_SCR_CAR,
      entityName: 'scr_Car',
      routingPath: 'car',
      entityId: '1',
      upsertMutationOptions: {
        onCompleted: spy
      }
    }), {wrapper});

    await act(async () => {
      await result.current.executeUpsertMutation({
        variables: {
          car: {
            id: '1',
            manufacturer: 'BBB'
          }
        }
      })
    });

    expect(spy).toHaveBeenCalled();
  });

  it('puts data into form', async () => {
    const spy = jest.fn();

    renderHook(() => useEntityEditor({
      loadQuery: LOAD_SCR_CAR,
      upsertMutation: UPSERT_SCR_CAR,
      entityName: 'scr_Car',
      routingPath: 'car',
      entityId: '1',
      useEntityEditorForm: spy
    }), {wrapper});

    expect(spy).toHaveBeenCalled();
  });

});