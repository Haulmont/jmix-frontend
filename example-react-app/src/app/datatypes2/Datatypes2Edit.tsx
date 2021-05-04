import React, { useContext } from "react";
import { Form, Alert, Button, Card } from "antd";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { FormattedMessage } from "react-intl";
import { useMetadata, ScreensContext } from "@haulmont/jmix-react-core";
import {
  createAntdFormValidationMessages,
  RetryDialog,
  MultilineText,
  Spinner,
  useEntityEditor,
  MultiScreenContext
} from "@haulmont/jmix-react-ui";
import { gql } from "@apollo/client";
import "../../app/App.css";

const ENTITY_NAME = "scr_DatatypesTestEntity2";
const INPUT_NAME = "datatypesTestEntity2";
const ROUTING_PATH = "/datatypes2Management";

const LOAD_SCR_DATATYPESTESTENTITY2 = gql`
  query scr_DatatypesTestEntity2ById($id: String!, $loadItem: Boolean!) {
    scr_DatatypesTestEntity2ById(id: $id) @include(if: $loadItem) {
      id
      _instanceName
    }
  }
`;

const UPSERT_SCR_DATATYPESTESTENTITY2 = gql`
  mutation Upsert_scr_DatatypesTestEntity2(
    $datatypesTestEntity2: inp_scr_DatatypesTestEntity2!
  ) {
    upsert_scr_DatatypesTestEntity2(
      datatypesTestEntity2: $datatypesTestEntity2
    ) {
      id
    }
  }
`;

const Datatypes2Edit = observer(() => {
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
    loadQuery: LOAD_SCR_DATATYPESTESTENTITY2,
    upsertMutation: UPSERT_SCR_DATATYPESTESTENTITY2,
    entityId: multiScreen?.params?.entityId,
    queryName: "scr_DatatypesTestEntity2ById",
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

export default Datatypes2Edit;
