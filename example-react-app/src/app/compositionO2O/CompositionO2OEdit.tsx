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
  MultiScreenContext
} from "@haulmont/jmix-react-ui";
import { gql } from "@apollo/client";
import "../../app/App.css";

const ENTITY_NAME = "scr_CompositionO2OTestEntity";
const INPUT_NAME = "compositionO2OTestEntity";
const ROUTING_PATH = "/compositionO2OManagement";

const LOAD_SCR_COMPOSITIONO2OTESTENTITY = gql`
  query scr_CompositionO2OTestEntityById($id: String!, $loadItem: Boolean!) {
    scr_CompositionO2OTestEntityById(id: $id) @include(if: $loadItem) {
      id
      _instanceName
      name
    }
  }
`;

const UPSERT_SCR_COMPOSITIONO2OTESTENTITY = gql`
  mutation Upsert_scr_CompositionO2OTestEntity(
    $compositionO2OTestEntity: inp_scr_CompositionO2OTestEntity!
  ) {
    upsert_scr_CompositionO2OTestEntity(
      compositionO2OTestEntity: $compositionO2OTestEntity
    ) {
      id
    }
  }
`;

const CompositionO2OEdit = observer(() => {
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
    loadQuery: LOAD_SCR_COMPOSITIONO2OTESTENTITY,
    upsertMutation: UPSERT_SCR_COMPOSITIONO2OTESTENTITY,
    entityId: multiScreen?.params?.entityId,
    queryName: "scr_CompositionO2OTestEntityById",
    entityName: ENTITY_NAME,
    inputName: INPUT_NAME,
    routingPath: ROUTING_PATH,
    screens,
    multiScreen
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
            <FormattedMessage id="common.submit" />
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
});

export default CompositionO2OEdit;
