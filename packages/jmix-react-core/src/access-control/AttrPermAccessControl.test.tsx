import '@testing-library/jest-dom';
import {EntityAttrPermissionValue} from "@haulmont/jmix-rest";
import {assertNever} from "../util/errorHandling";
import React from "react";
import {AttrPermAccessControl} from "./AttrPermAccessControl";
import {render, screen} from "@testing-library/react";

const PERMS_MOCK: any = {
  entityAttributes: {
    scr_Car: {
      manufacturer: 'VIEW',
      garage: 'MODIFY',
      price: 'DENY',
    }
  }
};

const disabledAttrsSpy = jest.fn();

const isAttributePermissionGranted = (entityName: string, attrName: string, requiredAttrPerm: Exclude<EntityAttrPermissionValue, 'DENY'>) => {
  const perm: EntityAttrPermissionValue = PERMS_MOCK.entityAttributes[entityName]?.[attrName];

  if (perm == null) {
    return false;
  }

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

describe('<AttrPermAccessControl>', () => {
  it('shows component when permission is granted', () => {
    render(
      <AttrPermAccessControl entityName={'scr_Car'}
                             attrName={'manufacturer'}
                             requiredAttrPerm={'VIEW'}
      >
        <AccessControlledComponent />
      </AttrPermAccessControl>
    )

    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeInTheDocument();
  });

  it('hides component when permission is denied', () => {
    render(
      <AttrPermAccessControl entityName={'scr_Car'}
                             attrName={'manufacturer'}
                             requiredAttrPerm={'MODIFY'}
      >
        <AccessControlledComponent />
      </AttrPermAccessControl>
    )

    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeNull();
  });

  it('hides component when entityName is not valid', () => {
    render(
      <AttrPermAccessControl entityName={'not valid'}
                             attrName={'manufacturer'}
                             requiredAttrPerm={'MODIFY'}
      >
        <AccessControlledComponent />
      </AttrPermAccessControl>
    )

    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeNull();
  });

  it('hides component when attrName is not valid', () => {
    render(
      <AttrPermAccessControl entityName={'scr_Car'}
                             attrName={'not valid'}
                             requiredAttrPerm={'MODIFY'}
      >
        <AccessControlledComponent />
      </AttrPermAccessControl>
    )

    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeNull();
  });

  it('disabled component when `mode` is set to `disable`', () => {
    render(
      <AttrPermAccessControl entityName={'scr_Car'}
                             attrName={'manufacturer'}
                             requiredAttrPerm={'MODIFY'}
                             mode='disable'
      >
        <AccessControlledComponent />
      </AttrPermAccessControl>
    );
    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeInTheDocument();
    expect((screen.queryByRole('textbox', {name: 'Some Input'}) as HTMLInputElement)?.disabled).toEqual(true);
  });

  it('uses custom disabled prop', () => {
    render(
      <AttrPermAccessControl entityName={'scr_Car'}
                             attrName={'manufacturer'}
                             requiredAttrPerm={'MODIFY'}
                             mode='disable'
                             disabledPropName='modifiable'
                             disabledPropValue='no'
      >
        <AccessControlledComponent />
      </AttrPermAccessControl>
    );

    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeInTheDocument();
    expect((screen.queryByRole('textbox', {name: 'Some Input'}) as HTMLInputElement)?.disabled).toEqual(true);
    expect(disabledAttrsSpy).toHaveBeenCalledWith(undefined, 'no');
  });

  it('access-controlled component can be passed via render prop (renders as enabled)', () => {
    render(
      <AttrPermAccessControl entityName={'scr_Car'}
                             attrName={'manufacturer'}
                             requiredAttrPerm={'VIEW'}
                             render={(disabled: boolean) => <AccessControlledComponent disabled={disabled} />}
      />
    );
    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeInTheDocument();
    expect((screen.queryByRole('textbox', {name: 'Some Input'}) as HTMLInputElement)?.disabled).toEqual(false);
  });

  it('access-controlled component can be passed via render prop (renders as disabled)', () => {
    render(
      <AttrPermAccessControl entityName={'scr_Car'}
                             attrName={'manufacturer'}
                             requiredAttrPerm={'MODIFY'}
                             mode='disable'
                             render={(disabled: boolean) => <AccessControlledComponent disabled={disabled} />}
      />
    );
    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeInTheDocument();
    expect((screen.queryByRole('textbox', {name: 'Some Input'}) as HTMLInputElement)?.disabled).toEqual(true);
  });

  it('access-controlled component can be passed via render prop (renders as null)', () => {
    render(
      <AttrPermAccessControl entityName={'scr_Car'}
                             attrName={'manufacturer'}
                             requiredAttrPerm={'MODIFY'}
                             render={(disabled: boolean) => <AccessControlledComponent disabled={disabled} />}
      />
    );
    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeNull();
  });

});
