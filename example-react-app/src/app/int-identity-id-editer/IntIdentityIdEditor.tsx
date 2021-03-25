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
import { IntIdentityIdTestEntity } from "../../jmix/entities/scr_IntIdentityIdTestEntity";

const ENTITY_NAME = "scr_IntIdentityIdTestEntity";
const UPSERT_INPUT_NAME = "intIdentityIdTestEntity";
const ROUTING_PATH = "/intIdentityIdEditor";

const LOAD_SCR_INTIDENTITYIDTESTENTITY = gql`
  query scr_IntIdentityIdTestEntityById($id: String = "", $loadItem: Boolean!) {
    scr_IntIdentityIdTestEntityById(id: $id) @include(if: $loadItem) {
      id
      _instanceName
      description

      updateTs
      updatedBy
      deleteTs
      deletedBy
      createTs
      createdBy
      version

      datatypesTestEntity {
        id
        _instanceName
      }
      datatypesTestEntity3 {
        id
        _instanceName
      }
    }

    scr_DatatypesTestEntityList {
      id
      _instanceName
    }

    scr_DatatypesTestEntity3List {
      id
      _instanceName
    }
  }
`;

const UPSERT_SCR_INTIDENTITYIDTESTENTITY = gql`
  mutation Upsert_scr_IntIdentityIdTestEntity(
    $intIdentityIdTestEntity: inp_scr_IntIdentityIdTestEntity!
  ) {
    upsert_scr_IntIdentityIdTestEntity(
      intIdentityIdTestEntity: $intIdentityIdTestEntity
    ) {
      id
    }
  }
`;

const IntIdentityIdEditor = observer(
  (props: EntityEditorProps<IntIdentityIdTestEntity>) => {
    const {
      onCommit,
      entityInstance,
      submitBtnCaption = "common.submit"
    } = props;

    const [form] = useForm();

    const {
      relationOptions,
      executeLoadQuery,
      loadQueryResult: { loading: queryLoading, error: queryError },
      upsertMutationResult: { loading: upsertLoading },
      entityEditorState,
      intl,
      handleSubmit,
      handleSubmitFailed,
      handleCancelBtnClick
    } = useEntityEditor<IntIdentityIdTestEntity>({
      loadQuery: LOAD_SCR_INTIDENTITYIDTESTENTITY,
      upsertMutation: UPSERT_SCR_INTIDENTITYIDTESTENTITY,
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
            propertyName="description"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="updateTs"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="updatedBy"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="deleteTs"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="deletedBy"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="createTs"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="createdBy"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="datatypesTestEntity"
            associationOptions={relationOptions?.get("scr_DatatypesTestEntity")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="datatypesTestEntity3"
            associationOptions={relationOptions?.get(
              "scr_DatatypesTestEntity3"
            )}
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
  "intIdentityIdEditor",
  <IntIdentityIdEditor />
);

export default IntIdentityIdEditor;
