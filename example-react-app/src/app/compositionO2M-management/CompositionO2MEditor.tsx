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

const ENTITY_NAME = "scr_CompositionO2MTestEntity";
const UPSERT_INPUT_NAME = "compositionO2MTestEntity";
const ROUTING_PATH = "/compositionO2MEditor";

const LOAD_SCR_COMPOSITIONO2MTESTENTITY = gql`
  query scr_CompositionO2MTestEntityById(
    $id: String = ""
    $loadItem: Boolean!
  ) {
    scr_CompositionO2MTestEntityById(id: $id) @include(if: $loadItem) {
      id
      _instanceName
      name
      datatypesTestEntity {
        id
        _instanceName
      }
    }

    scr_DatatypesTestEntityList {
      id
      _instanceName
    }
  }
`;

const UPSERT_SCR_COMPOSITIONO2MTESTENTITY = gql`
  mutation Upsert_scr_CompositionO2MTestEntity(
    $compositionO2MTestEntity: inp_scr_CompositionO2MTestEntity!
  ) {
    upsert_scr_CompositionO2MTestEntity(
      compositionO2MTestEntity: $compositionO2MTestEntity
    ) {
      id
    }
  }
`;

const CompositionO2MEditor = observer((props: EntityEditorProps) => {
  const {
    onCommit,
    entityInstance,
    submitBtnCaption = "common.submit"
  } = props;
  const multiScreen = useContext(MultiScreenContext);
  const screens = useContext(ScreensContext);
  const metadata = useMetadata();

  const {
    load,
    loadQueryResult: { loading: queryLoading, error: queryError, data },
    upsertMutationResult: { loading: upsertLoading },
    store,
    form,
    intl,
    handleFinish,
    handleFinishFailed,
    handleCancelBtnClick
  } = useEntityEditor({
    loadQuery: LOAD_SCR_COMPOSITIONO2MTESTENTITY,
    upsertMutation: UPSERT_SCR_COMPOSITIONO2MTESTENTITY,
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
    return <RetryDialog onRetry={load} />;
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
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="datatypesTestEntity"
          associationOptions={data?.scr_DatatypesTestEntityList}
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
});

registerEntityEditorScreen(
  ENTITY_NAME,
  "compositionO2MEditor",
  <CompositionO2MEditor />
);

export default CompositionO2MEditor;
