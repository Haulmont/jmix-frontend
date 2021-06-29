import TestRenderer, {ReactTestRenderer} from "react-test-renderer";
import {EnumField, Field, FormField, selectFormSuccessMessageId} from "./Form";
import React from "react";
import {Provider} from "mobx-react"

describe('Form', () => {
  let fieldTestRenderer: ReactTestRenderer;
  const mainStore = {
    security: {
      // tslint:disable-next-line:no-empty
      getAttributePermission: () => {
      }
    }
  };
  describe('Field component', () => {
    const fieldJSX = (<Provider mainStore={mainStore}>
      <Field entityName="test-entity-name" propertyName="test-property-name"/>;
    </Provider>)

    it('Field with only required props renders', () => {
      TestRenderer.act(() => {
        fieldTestRenderer = TestRenderer.create(fieldJSX)
      })
    });

    it('Field with only required props unmount', () => {
      TestRenderer.act(() => {
        fieldTestRenderer.unmount();
      })
    });
  });

  describe('EnumField', () => {
    const enumFieldJSX = (enumClass: string) => <EnumField enumClass={enumClass}/>

    it('EnumField renders correctly with an existing enumClass', () => {
      TestRenderer.act(() => {
        fieldTestRenderer = TestRenderer.create(enumFieldJSX('Car'));
      });

      const testInstance = fieldTestRenderer.root
      expect(testInstance.props).toHaveProperty('enumClass');
      expect(testInstance.props.enumClass).toEqual('Car');
    });

    it('EnumField unmount', () => {
      TestRenderer.act(() => {
        fieldTestRenderer.unmount();
      });
    });
  })

  describe('FormField component', () => {
    it('FormField renders correctly with required props', () => {
        TestRenderer.act(() => {
          fieldTestRenderer = TestRenderer.create(
            <Provider mainStore={mainStore}>
              <FormField entityName={'carType'} propertyName={'manufacturer'}/>
            </Provider>
          )
        })

        const testInstance = fieldTestRenderer.root;

        const props = testInstance.props.children.props


        expect(props).toHaveProperty('entityName');
        expect(props).toHaveProperty('propertyName');

        expect(props.entityName).toEqual('carType');
        expect(props.propertyName).toEqual('manufacturer');
      }
    );

    it('FormField unmounts', () => {
        TestRenderer.act(() => {
          fieldTestRenderer.unmount();
        })
      }
    )
  })

  describe('EnumField component', () => {
      it('EnumField renders correctly with required props', () => {
        TestRenderer.act(() => {
          fieldTestRenderer = TestRenderer.create(<EnumField enumClass="Car"/>)
        })

        const testInstance = fieldTestRenderer.root
        expect(testInstance.props).toHaveProperty('enumClass');
        expect(testInstance.props.enumClass).toEqual('Car');
      })

      it('EnumField unmounts', () => {
        TestRenderer.act(() => {
          fieldTestRenderer.unmount();
        })
      })
    }
  )

  describe('selectFormSuccessMessageId', () => {
      it('selectFormSuccessMessageId must return "management.editor.created" with "create" input', () => {
        expect(selectFormSuccessMessageId('create')).toEqual('management.editor.created');
      })

      it('selectFormSuccessMessageId must return "management.editor.updated" with "edit" input', () => {
        expect(selectFormSuccessMessageId('edit')).toEqual('management.editor.updated');
      })
    }
  )
})
