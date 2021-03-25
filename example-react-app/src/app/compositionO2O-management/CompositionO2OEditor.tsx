import React, { useContext } from "react";
import { Form, Alert, Button, Card } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { FormattedMessage } from "react-intl";
import {
  createAntdFormValidationMessages,
  createUseAntdForm,
  RetryDialog,
  Field,
  MultilineText,
  Spinner,
  useEntityEditor,
  EntityEditorProps,
  registerEntityEditorScreen
} from "@haulmont/jmix-react-ui";
import { gql } from "@apollo/client";
import { CompositionO2OTestEntity } from "../../jmix/entities/scr_CompositionO2OTestEntity";

const ENTITY_NAME = "scr_CompositionO2OTestEntity";
const UPSERT_INPUT_NAME = "compositionO2OTestEntity";
const ROUTING_PATH = "/compositionO2OEditor";

const LOAD_SCR_COMPOSITIONO2OTESTENTITY = gql`
  query scr_CompositionO2OTestEntityById(
    $id: String = ""
    $loadItem: Boolean!
  ) {
    scr_CompositionO2OTestEntityById(id: $id) @include(if: $loadItem) {
      id
      _instanceName
      name
      quantity
      nestedComposition {
        id
        _instanceName
        name
      }
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

const CompositionO2OEditor = observer(
  (props: EntityEditorProps<CompositionO2OTestEntity>) => {
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
      entityEditorState,
      intl,
      handleSubmit,
      handleSubmitFailed,
      handleCancelBtnClick
    } = useEntityEditor<CompositionO2OTestEntity>({
      loadQuery: LOAD_SCR_COMPOSITIONO2OTESTENTITY,
      upsertMutation: UPSERT_SCR_COMPOSITIONO2OTESTENTITY,
      entityName: ENTITY_NAME,
      upsertInputName: UPSERT_INPUT_NAME,
      routingPath: ROUTING_PATH,
      onCommit,
      entityInstance,
      useEntityEditorForm: createUseAntdForm(form)
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
            propertyName="nestedComposition"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          {entityEditorState.globalErrors.length > 0 && (
            <Alert
              message={
                <MultilineText lines={toJS(entityEditorState.globalErrors)} />
              }
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

registerEntityEditorScreen(
  ENTITY_NAME,
  "compositionO2OEditor",
  <CompositionO2OEditor />
);

export default CompositionO2OEditor;
