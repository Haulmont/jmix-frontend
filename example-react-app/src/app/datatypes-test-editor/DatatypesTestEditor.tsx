import React, { useContext } from "react";
import { Form, Alert, Button, Card } from "antd";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { FormattedMessage } from "react-intl";
import { useMetadata, ScreensContext } from "@haulmont/jmix-react-core";
import {
  createAntdFormValidationMessages,
  RetryDialog,
  Field,
  MultilineText,
  Spinner,
  useEntityEditor,
  EntityEditorProps,
  MultiScreenContext,
  registerEntityEditorScreen
} from "@haulmont/jmix-react-ui";
import { gql } from "@apollo/client";
import "../../app/App.css";
import { DatatypesTestEntity } from "../../jmix/entities/scr_DatatypesTestEntity";

const ENTITY_NAME = "scr_DatatypesTestEntity";
const UPSERT_INPUT_NAME = "datatypesTestEntity";
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
      }
      compositionO2Mattr {
        id
        _instanceName
        name
        quantity
        datatypesTestEntity {
          id
          _instanceName
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
      hiddenAttributes
    } = props;
    const multiScreen = useContext(MultiScreenContext);
    const screens = useContext(ScreensContext);
    const metadata = useMetadata();

    const {
      executeLoadQuery,
      loadQueryResult: { loading: queryLoading, error: queryError, data },
      upsertMutationResult: { loading: upsertLoading },
      store,
      form,
      intl,
      handleFinish,
      handleFinishFailed,
      handleCancelBtnClick
    } = useEntityEditor<DatatypesTestEntity>({
      loadQuery: LOAD_SCR_DATATYPESTESTENTITY,
      upsertMutation: UPSERT_SCR_DATATYPESTESTENTITY,
      entityId: multiScreen?.params?.entityId,
      entityName: ENTITY_NAME,
      upsertInputName: UPSERT_INPUT_NAME,
      routingPath: ROUTING_PATH,
      hasAssociations: true,
      screens,
      multiScreen,
      onCommit,
      entityInstance
    });

    if (queryLoading || metadata == null) {
      return <Spinner />;
    }

    if (queryError != null) {
      console.error(queryError);
      return <RetryDialog onRetry={executeLoadQuery} />;
    }

    return (
      <Card className="narrow-layout">
        <Form
          onFinish={handleFinish}
          onFinishFailed={handleFinishFailed}
          layout="vertical"
          form={form}
          validateMessages={createAntdFormValidationMessages(intl)}
        >
          <Field
            entityName={ENTITY_NAME}
            propertyName="bigDecimalAttr"
            hide={hiddenAttributes?.includes("bigDecimalAttr")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="booleanAttr"
            hide={hiddenAttributes?.includes("booleanAttr")}
            formItemProps={{
              style: { marginBottom: "12px" },
              valuePropName: "checked"
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="dateAttr"
            hide={hiddenAttributes?.includes("dateAttr")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="dateTimeAttr"
            hide={hiddenAttributes?.includes("dateTimeAttr")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="doubleAttr"
            hide={hiddenAttributes?.includes("doubleAttr")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="integerAttr"
            hide={hiddenAttributes?.includes("integerAttr")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="longAttr"
            hide={hiddenAttributes?.includes("longAttr")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="stringAttr"
            hide={hiddenAttributes?.includes("stringAttr")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="timeAttr"
            hide={hiddenAttributes?.includes("timeAttr")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="uuidAttr"
            hide={hiddenAttributes?.includes("uuidAttr")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="localDateTimeAttr"
            hide={hiddenAttributes?.includes("localDateTimeAttr")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="offsetDateTimeAttr"
            hide={hiddenAttributes?.includes("offsetDateTimeAttr")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="localDateAttr"
            hide={hiddenAttributes?.includes("localDateAttr")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="localTimeAttr"
            hide={hiddenAttributes?.includes("localTimeAttr")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="offsetTimeAttr"
            hide={hiddenAttributes?.includes("offsetTimeAttr")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="enumAttr"
            hide={hiddenAttributes?.includes("enumAttr")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="associationO2Oattr"
            hide={hiddenAttributes?.includes("associationO2Oattr")}
            associationOptions={data?.scr_AssociationO2OTestEntityList}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="associationM2Oattr"
            hide={hiddenAttributes?.includes("associationM2Oattr")}
            associationOptions={data?.scr_AssociationM2OTestEntityList}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="associationM2Mattr"
            hide={hiddenAttributes?.includes("associationM2Mattr")}
            associationOptions={data?.scr_AssociationM2MTestEntityList}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="compositionO2Oattr"
            hide={hiddenAttributes?.includes("compositionO2Oattr")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="compositionO2Mattr"
            hide={hiddenAttributes?.includes("compositionO2Mattr")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="intIdentityIdTestEntityAssociationO2OAttr"
            hide={hiddenAttributes?.includes(
              "intIdentityIdTestEntityAssociationO2OAttr"
            )}
            associationOptions={data?.scr_IntIdentityIdTestEntityList}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="integerIdTestEntityAssociationM2MAttr"
            hide={hiddenAttributes?.includes(
              "integerIdTestEntityAssociationM2MAttr"
            )}
            associationOptions={data?.scr_IntegerIdTestEntityList}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="datatypesTestEntity3"
            hide={hiddenAttributes?.includes("datatypesTestEntity3")}
            associationOptions={data?.scr_DatatypesTestEntity3List}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="name"
            hide={hiddenAttributes?.includes("name")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          {store.globalErrors.length > 0 && (
            <Alert
              message={<MultilineText lines={toJS(store.globalErrors)} />}
              type="error"
              style={{ marginBottom: "24px" }}
            />
          )}

          <Form.Item style={{ textAlign: "center" }}>
            <Button htmlType="button" onClick={handleCancelBtnClick}>
              <FormattedMessage id="common.cancel" />
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={upsertLoading}
              style={{ marginLeft: "8px" }}
            >
              <FormattedMessage id={submitBtnCaption} />
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
);

registerEntityEditorScreen(
  ENTITY_NAME,
  "datatypesTestEditor",
  <DatatypesTestEditor />
);

export default DatatypesTestEditor;
