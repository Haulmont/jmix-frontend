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
import { StringIdTestEntity } from "../../jmix/entities/scr_StringIdTestEntity";

const ENTITY_NAME = "scr_StringIdTestEntity";
const UPSERT_INPUT_NAME = "stringIdTestEntity";
const ROUTING_PATH = "/stringIdMgtCardsEdit";

const LOAD_SCR_STRINGIDTESTENTITY = gql`
  query scr_StringIdTestEntityById($id: String = "", $loadItem: Boolean!) {
    scr_StringIdTestEntityById(id: $id) @include(if: $loadItem) {
      identifier
      _instanceName
      description
      productCode

      createTs
      createdBy
      updateTs
      updatedBy
      deleteTs
      deletedBy
      version

      datatypesTestEntity {
        id
        _instanceName
      }
      datatypesTestEntity3 {
        id
        _instanceName
      }
    }

    scr_DatatypesTestEntityList {
      id
      _instanceName
    }

    scr_DatatypesTestEntity3List {
      id
      _instanceName
    }
  }
`;

const UPSERT_SCR_STRINGIDTESTENTITY = gql`
  mutation Upsert_scr_StringIdTestEntity(
    $stringIdTestEntity: inp_scr_StringIdTestEntity!
  ) {
    upsert_scr_StringIdTestEntity(stringIdTestEntity: $stringIdTestEntity) {
      id
    }
  }
`;

const StringIdMgtCardsEdit = observer(
  (props: EntityEditorProps<StringIdTestEntity>) => {
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
    } = useEntityEditor<StringIdTestEntity>({
      loadQuery: LOAD_SCR_STRINGIDTESTENTITY,
      upsertMutation: UPSERT_SCR_STRINGIDTESTENTITY,
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
            propertyName="description"
            hide={hiddenAttributes?.includes("description")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="productCode"
            hide={hiddenAttributes?.includes("productCode")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="createTs"
            hide={hiddenAttributes?.includes("createTs")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="createdBy"
            hide={hiddenAttributes?.includes("createdBy")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="updateTs"
            hide={hiddenAttributes?.includes("updateTs")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="updatedBy"
            hide={hiddenAttributes?.includes("updatedBy")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="deleteTs"
            hide={hiddenAttributes?.includes("deleteTs")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="deletedBy"
            hide={hiddenAttributes?.includes("deletedBy")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="datatypesTestEntity"
            hide={hiddenAttributes?.includes("datatypesTestEntity")}
            associationOptions={data?.scr_DatatypesTestEntityList}
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
  "stringIdMgtCardsEdit",
  <StringIdMgtCardsEdit />
);

export default StringIdMgtCardsEdit;
