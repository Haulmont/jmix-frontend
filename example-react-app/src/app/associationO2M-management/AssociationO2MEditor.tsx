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
import "../../app/App.css";
import { AssociationO2MTestEntity } from "../../jmix/entities/scr_AssociationO2MTestEntity";

const ENTITY_NAME = "scr_AssociationO2MTestEntity";
const UPSERT_INPUT_NAME = "associationO2MTestEntity";
const ROUTING_PATH = "/associationO2MEditor";

const LOAD_SCR_ASSOCIATIONO2MTESTENTITY = gql`
  query scr_AssociationO2MTestEntityById(
    $id: String = ""
    $loadItem: Boolean!
  ) {
    scr_AssociationO2MTestEntityById(id: $id) @include(if: $loadItem) {
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

const AssociationO2MEditor = observer(
  (props: EntityEditorProps<AssociationO2MTestEntity>) => {
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
    } = useEntityEditor<AssociationO2MTestEntity>({
      loadQuery: LOAD_SCR_ASSOCIATIONO2MTESTENTITY,
      upsertMutation: UPSERT_SCR_ASSOCIATIONO2MTESTENTITY,
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
  "associationO2MEditor",
  <AssociationO2MEditor />
);

export default AssociationO2MEditor;
