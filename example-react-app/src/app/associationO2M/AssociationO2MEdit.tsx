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

const ENTITY_NAME = "scr_AssociationO2MTestEntity";
const ROUTING_PATH = "/associationO2MManagement";

const LOAD_SCR_ASSOCIATIONO2MTESTENTITY = gql`
  query scr_AssociationO2MTestEntityById($id: String!) {
    scr_AssociationO2MTestEntityById(id: $id) {
      id
      _instanceName
      name
    }
  }
`;

const UPSERT_SCR_ASSOCIATIONO2MTESTENTITY = gql`
  mutation Upsert_scr_AssociationO2MTestEntity(
    $associationO2MTestEntity: inp_scr_AssociationO2MTestEntity!
  ) {
    upsert_scr_AssociationO2MTestEntity(
      associationO2MTestEntity: $associationO2MTestEntity
    ) {
      id
    }
  }
`;

const AssociationO2MEdit = observer(() => {
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
    loadQuery: LOAD_SCR_ASSOCIATIONO2MTESTENTITY,
    upsertMutation: UPSERT_SCR_ASSOCIATIONO2MTESTENTITY,
    entityId: multiScreen?.params?.entityId,
    queryName: "scr_AssociationO2MTestEntityById",
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

export default AssociationO2MEdit;
