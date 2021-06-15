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
import { DeeplyNestedO2MTestEntity } from "../../jmix/entities/scr_DeeplyNestedO2MTestEntity";

const ENTITY_NAME = "scr_DeeplyNestedO2MTestEntity";
const ROUTING_PATH = "/deeplyNestedO2MTestEntityEditor";

const LOAD_SCR_DEEPLYNESTEDO2MTESTENTITY = gql`
  query scr_DeeplyNestedO2MTestEntityById(
    $id: String = ""
    $loadItem: Boolean!
  ) {
    scr_DeeplyNestedO2MTestEntityById(id: $id) @include(if: $loadItem) {
      id
      _instanceName
      name
    }
  }
`;

const UPSERT_SCR_DEEPLYNESTEDO2MTESTENTITY = gql`
  mutation Upsert_scr_DeeplyNestedO2MTestEntity(
    $deeplyNestedO2MTestEntity: inp_scr_DeeplyNestedO2MTestEntity!
  ) {
    upsert_scr_DeeplyNestedO2MTestEntity(
      deeplyNestedO2MTestEntity: $deeplyNestedO2MTestEntity
    ) {
      id
    }
  }
`;

const DeeplyNestedO2MTestEntityEditor = observer(
  (props: EntityEditorProps<DeeplyNestedO2MTestEntity>) => {
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
    } = useEntityEditor<DeeplyNestedO2MTestEntity>({
      loadQuery: LOAD_SCR_DEEPLYNESTEDO2MTESTENTITY,
      upsertMutation: UPSERT_SCR_DEEPLYNESTEDO2MTESTENTITY,
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
            propertyName="name"
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
  component: DeeplyNestedO2MTestEntityEditor,
  caption: "deeplyNestedO2MTestEntityEditor",
  screenId: "DeeplyNestedO2MTestEntityEditor",
  crudOptions: {
    entityName: ENTITY_NAME,
    isEntityEditor: true
  }
});

export default DeeplyNestedO2MTestEntityEditor;
