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
  registerEntityEditor
} from "@haulmont/jmix-react-ui";
import { gql } from "@apollo/client";
import "../../app/App.css";
import { CompositionO2MTestEntity } from "../../jmix/entities/scr_CompositionO2MTestEntity";

const ENTITY_NAME = "scr_CompositionO2MTestEntity";
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
      quantity
      deeplyNestedO2Mattr {
        id
        _instanceName
        name
      }
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

const CompositionO2MEditor = observer(
  (props: EntityEditorProps<CompositionO2MTestEntity>) => {
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
    } = useEntityEditor<CompositionO2MTestEntity>({
      loadQuery: LOAD_SCR_COMPOSITIONO2MTESTENTITY,
      upsertMutation: UPSERT_SCR_COMPOSITIONO2MTESTENTITY,
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

          <Field
            entityName={ENTITY_NAME}
            propertyName="quantity"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="deeplyNestedO2Mattr"
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

registerEntityEditor({
  component: CompositionO2MEditor,
  caption: "screen.CompositionO2MEditor",
  screenId: "CompositionO2MEditor",
  entityName: ENTITY_NAME,
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});

export default CompositionO2MEditor;
