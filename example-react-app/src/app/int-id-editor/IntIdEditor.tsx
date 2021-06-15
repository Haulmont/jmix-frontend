import React, { useContext } from "react";
import { Form, Alert, Button, Card } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { FormattedMessage } from "react-intl";
import {
  createAntdFormValidationMessages,
  createUseAntdForm,
  createUseAntdFormValidation,
  RetryDialog,
  Field,
  GlobalErrorsAlert,
  Spinner,
  useEntityEditor,
  EntityEditorProps,
  registerScreen
} from "@haulmont/jmix-react-ui";
import { gql } from "@apollo/client";
import "../../app/App.css";
import { IntegerIdTestEntity } from "../../jmix/entities/scr_IntegerIdTestEntity";

const ENTITY_NAME = "scr_IntegerIdTestEntity";
const ROUTING_PATH = "/intIdEditor";

const LOAD_SCR_INTEGERIDTESTENTITY = gql`
  query scr_IntegerIdTestEntityById($id: String = "", $loadItem: Boolean!) {
    scr_IntegerIdTestEntityById(id: $id) @include(if: $loadItem) {
      id
      _instanceName
      description
    }
  }
`;

const UPSERT_SCR_INTEGERIDTESTENTITY = gql`
  mutation Upsert_scr_IntegerIdTestEntity(
    $integerIdTestEntity: inp_scr_IntegerIdTestEntity!
  ) {
    upsert_scr_IntegerIdTestEntity(integerIdTestEntity: $integerIdTestEntity) {
      id
    }
  }
`;

const IntIdEditor = observer(
  (props: EntityEditorProps<IntegerIdTestEntity>) => {
    const {
      onCommit,
      entityInstance,
      submitBtnCaption = "common.submit"
    } = props;

    const [form] = useForm();

    const {
      executeLoadQuery,
      loadQueryResult: { loading: queryLoading, error: queryError },
      upsertMutationResult: { loading: upsertLoading },
      serverValidationErrors,
      intl,
      handleSubmit,
      handleSubmitFailed,
      handleCancelBtnClick
    } = useEntityEditor<IntegerIdTestEntity>({
      loadQuery: LOAD_SCR_INTEGERIDTESTENTITY,
      upsertMutation: UPSERT_SCR_INTEGERIDTESTENTITY,
      entityName: ENTITY_NAME,
      routingPath: ROUTING_PATH,
      onCommit,
      entityInstance,
      useEntityEditorForm: createUseAntdForm(form),
      useEntityEditorFormValidation: createUseAntdFormValidation(form)
    });

    if (queryLoading) {
      return <Spinner />;
    }

    if (queryError != null) {
      console.error(queryError);
      return <RetryDialog onRetry={executeLoadQuery} />;
    }

    return (
      <Card className="narrow-layout">
        <Form
          onFinish={handleSubmit}
          onFinishFailed={handleSubmitFailed}
          layout="vertical"
          form={form}
          validateMessages={createAntdFormValidationMessages(intl)}
        >
          <Field
            entityName={ENTITY_NAME}
            propertyName="description"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <GlobalErrorsAlert serverValidationErrors={serverValidationErrors} />

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

registerScreen({
  component: IntIdEditor,
  caption: "intIdEditor",
  screenId: "IntIdEditor",
  crudOptions: {
    entityName: ENTITY_NAME,
    isEntityEditor: true
  }
});

export default IntIdEditor;
