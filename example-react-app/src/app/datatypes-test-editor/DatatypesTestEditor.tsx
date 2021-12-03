import React from "react";
import { Form, Button, Card, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { FormattedMessage } from "react-intl";
import {
  createUseAntdForm,
  createUseAntdFormValidation,
  RetryDialog,
  Field,
  GlobalErrorsAlert,
  Spinner,
  useEntityPersistCallbacks,
  useSubmitFailedCallback,
  ant_to_jmixFront
} from "@haulmont/jmix-react-antd";
import {
  createAntdFormValidationMessages,
  useEntityEditor,
  EntityEditorProps,
  registerEntityEditor,
  useDefaultEditorHotkeys
} from "@haulmont/jmix-react-web";
import { gql } from "@apollo/client";
import styles from "../../app/App.module.css";
import { DatatypesTestEntity } from "../../jmix/entities/scr_DatatypesTestEntity";

const ENTITY_NAME = "scr_DatatypesTestEntity";
const ROUTING_PATH = "/datatypesTestEditor";

const LOAD_SCR_DATATYPESTESTENTITY = gql`
  query scr_DatatypesTestEntityById($id: String = "", $loadItem: Boolean!) {
    scr_DatatypesTestEntityById(id: $id) @include(if: $loadItem) {
      id
      _instanceName
      bigDecimalAttr
      booleanAttr
      dateAttr
      dateTimeAttr
      doubleAttr
      integerAttr
      longAttr
      stringAttr
      charAttr
      timeAttr
      uuidAttr
      localDateTimeAttr
      offsetDateTimeAttr
      localDateAttr
      localTimeAttr
      offsetTimeAttr
      enumAttr
      associationO2Oattr {
        id
        _instanceName
      }
      associationO2Mattr {
        id
        _instanceName
      }
      associationM2Oattr {
        id
        _instanceName
      }
      associationM2Mattr {
        id
        _instanceName
      }
      compositionO2Oattr {
        id
        _instanceName
        name
        quantity
        nestedComposition {
          id
          _instanceName
          name
        }
      }
      compositionO2Mattr {
        id
        _instanceName
        name
        quantity
        deeplyNestedO2Mattr {
          id
          _instanceName
          name
        }
      }
      intIdentityIdTestEntityAssociationO2OAttr {
        id
        _instanceName
      }
      integerIdTestEntityAssociationM2MAttr {
        id
        _instanceName
      }
      datatypesTestEntity3 {
        id
        _instanceName
      }
      readOnlyStringAttr
      name
    }

    scr_AssociationO2OTestEntityList {
      id
      _instanceName
    }

    scr_AssociationM2OTestEntityList {
      id
      _instanceName
    }

    scr_AssociationM2MTestEntityList {
      id
      _instanceName
    }

    scr_IntIdentityIdTestEntityList {
      id
      _instanceName
    }

    scr_IntegerIdTestEntityList {
      id
      _instanceName
    }

    scr_DatatypesTestEntity3List {
      id
      _instanceName
    }
  }
`;

const UPSERT_SCR_DATATYPESTESTENTITY = gql`
  mutation Upsert_scr_DatatypesTestEntity(
    $datatypesTestEntity: inp_scr_DatatypesTestEntity!
  ) {
    upsert_scr_DatatypesTestEntity(datatypesTestEntity: $datatypesTestEntity) {
      id
    }
  }
`;

const DatatypesTestEditor = observer(
  (props: EntityEditorProps<DatatypesTestEntity>) => {
    const {
      onCommit,
      entityInstance,
      submitBtnCaption = "common.submit",
      disabled: readOnlyMode
    } = props;
    const [form] = useForm();
    const onSubmitFailed = useSubmitFailedCallback();
    const {
      relationOptions,
      executeLoadQuery,
      loadQueryResult: { loading: queryLoading, error: queryError },
      upsertMutationResult: { loading: upsertLoading },
      serverValidationErrors,
      intl,
      handleSubmit,
      handleCancelBtnClick
    } = useEntityEditor<DatatypesTestEntity>({
      loadQuery: LOAD_SCR_DATATYPESTESTENTITY,
      upsertMutation: UPSERT_SCR_DATATYPESTESTENTITY,
      entityName: ENTITY_NAME,
      routingPath: ROUTING_PATH,
      onCommit,
      entityInstance,
      persistEntityCallbacks: useEntityPersistCallbacks(),
      uiKit_to_jmixFront: ant_to_jmixFront,
      useEntityEditorForm: createUseAntdForm(form),
      useEntityEditorFormValidation: createUseAntdFormValidation(form)
    });

    useDefaultEditorHotkeys({ saveEntity: form.submit });

    if (queryLoading) {
      return <Spinner />;
    }

    if (queryError != null) {
      console.error(queryError);
      return <RetryDialog onRetry={executeLoadQuery} />;
    }

    return (
      <Card className={styles.narrowLayout}>
        <Form
          onFinish={handleSubmit}
          onFinishFailed={onSubmitFailed}
          layout="vertical"
          form={form}
          validateMessages={createAntdFormValidationMessages(intl)}
        >
          <Field
            entityName={ENTITY_NAME}
            propertyName="bigDecimalAttr"
            disabled={readOnlyMode}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="booleanAttr"
            disabled={readOnlyMode}
            formItemProps={{
              style: { marginBottom: "12px" },
              valuePropName: "checked"
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="dateAttr"
            disabled={readOnlyMode}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="dateTimeAttr"
            disabled={readOnlyMode}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="doubleAttr"
            disabled={readOnlyMode}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="integerAttr"
            disabled={readOnlyMode}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="longAttr"
            disabled={readOnlyMode}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="stringAttr"
            disabled={readOnlyMode}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="charAttr"
            disabled={readOnlyMode}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="timeAttr"
            disabled={readOnlyMode}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="uuidAttr"
            disabled={readOnlyMode}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="localDateTimeAttr"
            disabled={readOnlyMode}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="offsetDateTimeAttr"
            disabled={readOnlyMode}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="localDateAttr"
            disabled={readOnlyMode}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="localTimeAttr"
            disabled={readOnlyMode}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="offsetTimeAttr"
            disabled={readOnlyMode}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="enumAttr"
            disabled={readOnlyMode}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="associationO2Oattr"
            disabled={readOnlyMode}
            associationOptions={relationOptions?.get(
              "scr_AssociationO2OTestEntity"
            )}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="associationM2Oattr"
            disabled={readOnlyMode}
            associationOptions={relationOptions?.get(
              "scr_AssociationM2OTestEntity"
            )}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="associationM2Mattr"
            disabled={readOnlyMode}
            associationOptions={relationOptions?.get(
              "scr_AssociationM2MTestEntity"
            )}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="compositionO2Oattr"
            disabled={readOnlyMode}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="compositionO2Mattr"
            disabled={readOnlyMode}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="intIdentityIdTestEntityAssociationO2OAttr"
            disabled={readOnlyMode}
            associationOptions={relationOptions?.get(
              "scr_IntIdentityIdTestEntity"
            )}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="integerIdTestEntityAssociationM2MAttr"
            disabled={readOnlyMode}
            associationOptions={relationOptions?.get("scr_IntegerIdTestEntity")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="datatypesTestEntity3"
            disabled={readOnlyMode}
            associationOptions={relationOptions?.get(
              "scr_DatatypesTestEntity3"
            )}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="readOnlyStringAttr"
            disabled={true}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="name"
            disabled={readOnlyMode}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <GlobalErrorsAlert serverValidationErrors={serverValidationErrors} />

          <Form.Item style={{ textAlign: "center" }}>
            <Space size={8}>
              <Button htmlType="button" onClick={handleCancelBtnClick}>
                <FormattedMessage
                  id={readOnlyMode ? "common.back" : "common.cancel"}
                />
              </Button>
              {!readOnlyMode && (
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={upsertLoading}
                >
                  <FormattedMessage id={submitBtnCaption} />
                </Button>
              )}
            </Space>
          </Form.Item>
        </Form>
      </Card>
    );
  }
);

registerEntityEditor({
  component: DatatypesTestEditor,
  caption: "screen.DatatypesTestEditor",
  screenId: "DatatypesTestEditor",
  entityName: ENTITY_NAME,
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});

export default DatatypesTestEditor;
