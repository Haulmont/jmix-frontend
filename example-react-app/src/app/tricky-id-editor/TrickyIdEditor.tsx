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
import { TrickyIdTestEntity } from "../../jmix/entities/scr_TrickyIdTestEntity";

const ENTITY_NAME = "scr_TrickyIdTestEntity";
const UPSERT_INPUT_NAME = "trickyIdTestEntity";
const ROUTING_PATH = "/trickyIdEditor";

const LOAD_SCR_TRICKYIDTESTENTITY = gql`
  query scr_TrickyIdTestEntityById($id: String = "", $loadItem: Boolean!) {
    scr_TrickyIdTestEntityById(id: $id) @include(if: $loadItem) {
      id
      _instanceName
      otherAttr
    }
  }
`;

const UPSERT_SCR_TRICKYIDTESTENTITY = gql`
  mutation Upsert_scr_TrickyIdTestEntity(
    $trickyIdTestEntity: inp_scr_TrickyIdTestEntity!
  ) {
    upsert_scr_TrickyIdTestEntity(trickyIdTestEntity: $trickyIdTestEntity) {
      id
    }
  }
`;

const TrickyIdEditor = observer(
  (props: EntityEditorProps<TrickyIdTestEntity>) => {
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
    } = useEntityEditor<TrickyIdTestEntity>({
      loadQuery: LOAD_SCR_TRICKYIDTESTENTITY,
      upsertMutation: UPSERT_SCR_TRICKYIDTESTENTITY,
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
            propertyName="otherAttr"
            hide={hiddenAttributes?.includes("otherAttr")}
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

registerEntityEditorScreen(ENTITY_NAME, "trickyIdEditor", <TrickyIdEditor />);

export default TrickyIdEditor;
