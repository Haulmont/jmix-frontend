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

const ENTITY_NAME = "scr_StringIdTestEntity";
const ROUTING_PATH = "/stringIdMgtListManagement";

const LOAD_SCR_STRINGIDTESTENTITY = gql`
  query scr_StringIdTestEntityById($id: String!) {
    scr_StringIdTestEntityById(id: $id) {
      _instanceName
      id
      identifier
      description
      productCode
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

const StringIdMgtListEdit = observer(() => {
  const multiScreen = useContext(MultiScreenContext);
  const screens = useContext(ScreensContext);
  const metadata = useMetadata();

  const {
    loadItem,
    loadQueryResult: { loading: queryLoading, error: queryError },
    upsertMutationResult: { loading: upsertLoading },
    store,
    form,
    intl,
    handleFinish,
    handleFinishFailed,
    handleCancelBtnClick
  } = useEntityEditor({
    loadQuery: LOAD_SCR_STRINGIDTESTENTITY,
    upsertMutation: UPSERT_SCR_STRINGIDTESTENTITY,
    entityId: multiScreen?.params?.entityId,
    queryName: "scr_StringIdTestEntityById",
    entityName: ENTITY_NAME,
    routingPath: ROUTING_PATH,
    screens,
    multiScreen
  });

  if (queryLoading || metadata == null) {
    return <Spinner />;
  }

  if (queryError != null) {
    console.error(queryError);
    return <RetryDialog onRetry={loadItem} />;
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
          propertyName="identifier"
          formItemProps={{
            style: { marginBottom: "12px" },
            rules: [{ required: true }]
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="description"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="productCode"
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

export default StringIdMgtListEdit;
