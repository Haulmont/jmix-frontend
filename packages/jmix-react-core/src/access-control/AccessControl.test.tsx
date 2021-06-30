import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react'
import React from 'react';
import {AccessControl} from "./AccessControl";
import {EntityAttrPermissionValue, EntityOperationType} from "@haulmont/jmix-rest";
import { assertNever } from '../util/errorHandling';

const PERMS_MOCK: any = {
  entities: {
    scr_Car: {
      create: true,
      delete: false
    }
  },
  entityAttributes: {
    scr_Car: {
      manufacturer: 'VIEW',
      garage: 'MODIFY',
      price: 'DENY',
    }
  }
};

const disabledAttrsSpy = jest.fn();

const isOperationPermissionGranted = (entityName: string, operation: EntityOperationType) => {
  return PERMS_MOCK.entities[entityName][operation];
};
const isAttributePermissionGranted = (entityName: string, attrName: string, requiredAttrPerm: Exclude<EntityAttrPermissionValue, 'DENY'>) => {
  const perm: EntityAttrPermissionValue = PERMS_MOCK.entityAttributes[entityName][attrName];

  switch(requiredAttrPerm) {
    case 'VIEW':
      return perm === 'VIEW' || perm === 'MODIFY';
    case 'MODIFY':
      return perm === 'MODIFY';
    default:
      assertNever('requiredAttrPerm', requiredAttrPerm);
  }
};

jest.mock('../app/MainStore', () => ({
  ...jest.requireActual('../app/MainStore'),
  useMainStore: () => ({
    security: {
      isOperationPermissionGranted,
      isAttributePermissionGranted,
      isDataLoaded: () => true,
    }
  })
}));

interface AccessControlledComponentProps {
  disabled?: boolean;
  modifiable?: 'yes' | 'no';
}

const AccessControlledComponent = (props: AccessControlledComponentProps) => {
  const {disabled, modifiable} = props;
  disabledAttrsSpy(disabled, modifiable);
  const disabledValue = disabled || (modifiable === 'no');
  return (
    <>
      <label htmlFor='someInput'>Some Input</label>
      <input id='someInput' name='someInput' type='text' disabled={disabledValue} />
    </>
  );
};

describe('<AccessControl>', () => {
  it('displays children if entityReqs are fulfilled', () => {
    render(
      <AccessControl displayReqs={{
        entityReqs: [
          {entityName: 'scr_Car', operation: 'create'}
        ]
      }}>
        <AccessControlledComponent/>
      </AccessControl>
    );

    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeInTheDocument();
  });

  it('does not display children if entityReqs are not fulfilled', () => {
    render(
      <AccessControl displayReqs={{
        entityReqs: [
          {entityName: 'scr_Car', operation: 'delete'}
        ]
      }}>
        <AccessControlledComponent/>
      </AccessControl>
    );

    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeNull();
  });

  it('displays children if attrReqs are fulfilled', () => {
    render(
      <AccessControl displayReqs={{
        attrReqs: [
          {entityName: 'scr_Car', attrName: 'manufacturer', requiredAttrPerm: 'VIEW'}
        ]
      }}>
        <AccessControlledComponent/>
      </AccessControl>
    );

    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeInTheDocument();
  });

  it('does not display children if attrReqs are not fulfilled', () => {
    render(
      <AccessControl displayReqs={{
        attrReqs: [
          {entityName: 'scr_Car', attrName: 'manufacturer', requiredAttrPerm: 'MODIFY'}
        ]
      }}>
        <AccessControlledComponent/>
      </AccessControl>
    );

    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeNull();
  });

  it('displays children if customReqs are fulfilled', () => {
    render(
      <AccessControl displayReqs={{
        customReqs: () => true
      }}>
        <AccessControlledComponent/>
      </AccessControl>
    );

    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeInTheDocument();
  });

  it('does not display children if customReqs are not fulfilled', () => {
    render(
      <AccessControl displayReqs={{
        customReqs: () => false
      }}>
        <AccessControlledComponent/>
      </AccessControl>
    );

    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeNull();
  });

  it('does not display children when not all requirements are fulfilled', () => {
    render(
      <AccessControl displayReqs={{
        entityReqs: [
          {entityName: 'scr_Car', operation: 'create'}
        ],
        attrReqs: [
          {entityName: 'scr_Car', attrName: 'manufacturer', requiredAttrPerm: 'MODIFY'}
        ],
        customReqs: () => true
      }}>
        <AccessControlledComponent/>
      </AccessControl>
    );

    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeNull();
  });

  it('displays children as enabled if modifyReqs are fulfilled', () => {
    render(
      <AccessControl modifyReqs={{
        entityReqs: [
          {entityName: 'scr_Car', operation: 'create'}
        ]
      }}>
        <AccessControlledComponent/>
      </AccessControl>
    );

    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeInTheDocument();
    expect((screen.queryByRole('textbox', {name: 'Some Input'}) as HTMLInputElement)?.disabled).toEqual(false);
  });

  it('displays children as disabled if modifyReqs are not fulfilled', () => {
    render(
      <AccessControl modifyReqs={{
        entityReqs: [
          {entityName: 'scr_Car', operation: 'delete'}
        ]
      }}>
        <AccessControlledComponent/>
      </AccessControl>
    );

    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeInTheDocument();
    expect((screen.queryByRole('textbox', {name: 'Some Input'}) as HTMLInputElement)?.disabled).toEqual(true);
  });

  it('uses custom disabled prop', () => {
    render(
      <AccessControl modifyReqs={{
                       attrReqs: [
                         {entityName: 'scr_Car', attrName: 'manufacturer', requiredAttrPerm: 'MODIFY'}
                       ],
                     }}
                     disabledPropName='modifiable'
                     disabledPropValue='no'
      >
        <AccessControlledComponent/>
      </AccessControl>
    );

    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeInTheDocument();
    expect((screen.queryByRole('textbox', {name: 'Some Input'}) as HTMLInputElement)?.disabled).toEqual(true);
    expect(disabledAttrsSpy).toHaveBeenCalledWith(undefined, 'no');
  });

  it('access-controlled component can be passed via render prop (renders as enabled)', () => {
    render(
      <AccessControl displayReqs={{customReqs: () => true}}
                     modifyReqs={{customReqs: () => true}}
                     render={(disabled: boolean) => <AccessControlledComponent disabled={disabled}/>}
      />
    );

    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeInTheDocument();
    expect((screen.queryByRole('textbox', {name: 'Some Input'}) as HTMLInputElement)?.disabled).toEqual(false);
  });

  it('access-controlled component can be passed via render prop (renders as disabled)', () => {
    render(
      <AccessControl displayReqs={{customReqs: () => true}}
                     modifyReqs={{customReqs: () => false}}
                     render={(disabled: boolean) => <AccessControlledComponent disabled={disabled}/>}
      />
    );

    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeInTheDocument();
    expect((screen.queryByRole('textbox', {name: 'Some Input'}) as HTMLInputElement)?.disabled).toEqual(true);
  });

  it('access-controlled component can be passed via render prop (renders as null)', () => {
    render(
      <AccessControl displayReqs={{customReqs: () => false}}
                     render={(disabled: boolean) => <AccessControlledComponent disabled={disabled}/>}
      />
    );

    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeNull();
  });

});