import '@testing-library/jest-dom';
import {EntityOperationType} from "@haulmont/jmix-rest";
import React from "react";
import {render, screen} from "@testing-library/react";
import {EntityPermAccessControl} from "./EntityPermAccessControl";

const PERMS_MOCK: any = {
  entities: {
    scr_Car: {
      create: true,
      delete: false
    }
  }
};

const disabledAttrsSpy = jest.fn();

const isOperationPermissionGranted = (entityName: string, operation: EntityOperationType) => {
  return PERMS_MOCK.entities[entityName]?.[operation] ?? false;
};

jest.mock('../app/MainStore', () => ({
  ...jest.requireActual('../app/MainStore'),
  useMainStore: () => ({
    security: {
      isOperationPermissionGranted,
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

describe('<EntityPermAccessControl>', () => {
  it('shows component when permission is granted', () => {
    render(
      <EntityPermAccessControl entityName='scr_Car' operation='create'>
        <AccessControlledComponent/>
      </EntityPermAccessControl>
    );

    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeInTheDocument();
  });

  it('hides component when permission is denied', () => {
    render(
      <EntityPermAccessControl entityName='scr_Car' operation='delete'>
        <AccessControlledComponent/>
      </EntityPermAccessControl>
    );

    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeNull();
  });

  it('hides component when entityName is not valid', () => {
    render(
      <EntityPermAccessControl entityName='not valid' operation='create'>
        <AccessControlledComponent/>
      </EntityPermAccessControl>
    );

    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeNull();
  });

  it('disabled component when `mode` is set to `disable`', () => {
    render(
      <EntityPermAccessControl entityName='scr_Car' operation='delete' mode='disable'>
        <AccessControlledComponent/>
      </EntityPermAccessControl>
    );

    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeInTheDocument();
    expect((screen.queryByRole('textbox', {name: 'Some Input'}) as HTMLInputElement)?.disabled).toEqual(true);
  });

  it('uses custom disabled prop', () => {
    render(
      <EntityPermAccessControl entityName='scr_Car'
                               operation='delete'
                               mode='disable'
                               disabledPropName='modifiable'
                               disabledPropValue='no'
      >
        <AccessControlledComponent/>
      </EntityPermAccessControl>
    );

    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeInTheDocument();
    expect((screen.queryByRole('textbox', {name: 'Some Input'}) as HTMLInputElement)?.disabled).toEqual(true);
    expect(disabledAttrsSpy).toHaveBeenCalledWith(undefined, 'no');
  });

  it('access-controlled component can be passed via render prop (renders as enabled)', () => {
    render(
      <EntityPermAccessControl entityName='scr_Car'
                               operation='create'
                               render={(disabled: boolean) => <AccessControlledComponent disabled={disabled}/>}
      />
    );

    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeInTheDocument();
    expect((screen.queryByRole('textbox', {name: 'Some Input'}) as HTMLInputElement)?.disabled).toEqual(false);
  });

  it('access-controlled component can be passed via render prop (renders as disabled)', () => {
    render(
      <EntityPermAccessControl entityName='scr_Car'
                               operation='delete'
                               mode='disable'
                               render={(disabled: boolean) => <AccessControlledComponent disabled={disabled}/>}
      />
    );

    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeInTheDocument();
    expect((screen.queryByRole('textbox', {name: 'Some Input'}) as HTMLInputElement)?.disabled).toEqual(true);
  });

  it('access-controlled component can be passed via render prop (renders as null)', () => {
    render(
      <EntityPermAccessControl entityName='scr_Car'
                               operation='delete'
                               render={(disabled: boolean) => <AccessControlledComponent disabled={disabled}/>}
      />
    );

    expect(screen.queryByRole('textbox', {name: 'Some Input'})).toBeNull();
  });

});
