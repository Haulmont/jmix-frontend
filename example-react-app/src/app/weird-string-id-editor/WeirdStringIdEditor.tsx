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
import { WeirdStringIdTestEntity } from "../../jmix/entities/scr_WeirdStringIdTestEntity";

const ENTITY_NAME = "scr_WeirdStringIdTestEntity";
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

const WeirdStringIdEditor = observer(
  (props: EntityEditorProps<WeirdStringIdTestEntity>) => {
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
    } = useEntityEditor<WeirdStringIdTestEntity>({
      loadQuery: LOAD_SCR_WEIRDSTRINGIDTESTENTITY,
      upsertMutation: UPSERT_SCR_WEIRDSTRINGIDTESTENTITY,
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
  component: WeirdStringIdEditor,
  caption: "weirdStringIdEditor",
  screenId: "WeirdStringIdEditor",
  crudOptions: {
    entityName: ENTITY_NAME,
    isEntityEditor: true
  }
});

export default WeirdStringIdEditor;
