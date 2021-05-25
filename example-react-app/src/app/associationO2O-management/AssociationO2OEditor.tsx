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
import { AssociationO2OTestEntity } from "../../jmix/entities/scr_AssociationO2OTestEntity";

const ENTITY_NAME = "scr_AssociationO2OTestEntity";
const UPSERT_INPUT_NAME = "associationO2OTestEntity";
const ROUTING_PATH = "/associationO2OEditor";

const LOAD_SCR_ASSOCIATIONO2OTESTENTITY = gql`
  query scr_AssociationO2OTestEntityById(
    $id: String = ""
    $loadItem: Boolean!
  ) {
    scr_AssociationO2OTestEntityById(id: $id) @include(if: $loadItem) {
      id
      _instanceName
      name
    }
  }
`;

const UPSERT_SCR_ASSOCIATIONO2OTESTENTITY = gql`
  mutation Upsert_scr_AssociationO2OTestEntity(
    $associationO2OTestEntity: inp_scr_AssociationO2OTestEntity!
  ) {
    upsert_scr_AssociationO2OTestEntity(
      associationO2OTestEntity: $associationO2OTestEntity
    ) {
      id
    }
  }
`;

const AssociationO2OEditor = observer(
  (props: EntityEditorProps<AssociationO2OTestEntity>) => {
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
      loadQueryResult: { loading: queryLoading, error: queryError },
      upsertMutationResult: { loading: upsertLoading },
      store,
      form,
      intl,
      handleFinish,
      handleFinishFailed,
      handleCancelBtnClick
    } = useEntityEditor<AssociationO2OTestEntity>({
      loadQuery: LOAD_SCR_ASSOCIATIONO2OTESTENTITY,
      upsertMutation: UPSERT_SCR_ASSOCIATIONO2OTESTENTITY,
      entityId: multiScreen?.params?.entityId,
      entityName: ENTITY_NAME,
      upsertInputName: UPSERT_INPUT_NAME,
      routingPath: ROUTING_PATH,
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
  "associationO2OEditor",
  <AssociationO2OEditor />
);

export default AssociationO2OEditor;
