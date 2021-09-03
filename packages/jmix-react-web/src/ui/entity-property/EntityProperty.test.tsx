import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { Provider } from "mobx-react";
import React from "react";
import {EntityProperty} from "./EntityProperty";
import {MainStore} from "@haulmont/jmix-react-core";

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
          },
          {
            name: 'garage',
            type: 'scr_Garage',
            attributeType: 'ASSOCIATION',
            cardinality: 'ONE-TO-MANY'
          }
        ]
      }
    ]
  })
}));

const mainStore = new MainStore(
  {} as any,
  {onLocaleChange: jest.fn()} as any
);

mainStore.messages = {
  scr_Car: 'Car',
  'scr_Car.manufacturer': 'Manufacturer',
  'scr_Car.garage': 'Garage',
};

describe('<EntityProperty>', () => {

  it('renders', () => {
    render(
      <Provider mainStore={mainStore}>
        <EntityProperty entityName={'scr_Car'} propertyName={'manufacturer'} value={'AAA'} />
      </Provider>
    );

    expect(screen.getByText('Manufacturer:')).toBeInTheDocument();
    expect(screen.getByText('AAA')).toBeInTheDocument();
  });

  it('does not show label if showLabel is false', () => {
    render(
      <Provider mainStore={mainStore}>
        <EntityProperty entityName={'scr_Car'}
                        propertyName={'manufacturer'}
                        value={'AAA'}
                        showLabel={false}
        />
      </Provider>
    );

    expect(screen.queryByText('Manufacturer:')).toBeNull();
    expect(screen.getByText('AAA')).toBeInTheDocument();
  });

  it('hides if empty value', () => {
    render(
      <Provider mainStore={mainStore}>
        <EntityProperty entityName={'scr_Car'}
                        propertyName={'manufacturer'}
                        value={''}
                        hideIfEmpty={true}
        />
      </Provider>
    );
    expect(screen.queryByText('AAA')).toBeNull();
  });

  it('renders instance name if value is object', () => {
    render(
      <Provider mainStore={mainStore}>
        <EntityProperty entityName={'scr_Car'}
                        propertyName={'garage'}
                        value={{
                          _instanceName: 'XXX',
                          id: '00001'
                        }}
        />
      </Provider>
    );

    expect(screen.getByText('Garage:')).toBeInTheDocument();
    expect(screen.getByText('XXX')).toBeInTheDocument();
  });

});