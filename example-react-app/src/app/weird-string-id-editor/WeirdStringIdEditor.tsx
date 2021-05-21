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

const ENTITY_NAME = "scr_WeirdStringIdTestEntity";
const UPSERT_INPUT_NAME = "weirdStringIdTestEntity";
const ROUTING_PATH = "/weirdStringIdEditor";

const LOAD_SCR_WEIRDSTRINGIDTESTENTITY = gql`
  query scr_WeirdStringIdTestEntityById($id: String = "", $loadItem: Boolean!) {
    scr_WeirdStringIdTestEntityById(id: $id) @include(if: $loadItem) {
      id
      _instanceName
      identifier
      description
    }
  }
`;

const UPSERT_SCR_WEIRDSTRINGIDTESTENTITY = gql`
  mutation Upsert_scr_WeirdStringIdTestEntity(
    $weirdStringIdTestEntity: inp_scr_WeirdStringIdTestEntity!
  ) {
    upsert_scr_WeirdStringIdTestEntity(
      weirdStringIdTestEntity: $weirdStringIdTestEntity
    ) {
      id
    }
  }
`;

const WeirdStringIdEditor = observer((props: EntityEditorProps) => {
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
    loadQueryResult: { loading: queryLoading, error: queryError },
    upsertMutationResult: { loading: upsertLoading },
    store,
    form,
    intl,
    handleFinish,
    handleFinishFailed,
    handleCancelBtnClick
  } = useEntityEditor({
    loadQuery: LOAD_SCR_WEIRDSTRINGIDTESTENTITY,
    upsertMutation: UPSERT_SCR_WEIRDSTRINGIDTESTENTITY,
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
          propertyName="id"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="description"
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
  "weirdStringIdEditor",
  <WeirdStringIdEditor />
);

export default WeirdStringIdEditor;
