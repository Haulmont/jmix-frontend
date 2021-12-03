import React from "react";
import { Form, Button, Card, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { FormattedMessage } from "react-intl";
import {
  createUseAntdForm,
  createUseAntdFormValidation,
  RetryDialog,
  Field,
  GlobalErrorsAlert,
  Spinner,
  useEntityPersistCallbacks,
  useSubmitFailedCallback,
  ant_to_jmixFront
} from "@haulmont/jmix-react-antd";
import {
  createAntdFormValidationMessages,
  useEntityEditor,
  EntityEditorProps,
  registerEntityEditor,
  useDefaultEditorHotkeys
} from "@haulmont/jmix-react-web";
import { gql } from "@apollo/client";
import styles from "../../app/App.module.css";
import { AssociationO2MTestEntity } from "../../jmix/entities/scr_AssociationO2MTestEntity";

const ENTITY_NAME = "scr_AssociationO2MTestEntity";
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
      submitBtnCaption = "common.submit",
      disabled: readOnlyMode
    } = props;
    const [form] = useForm();
    const onSubmitFailed = useSubmitFailedCallback();
    const {
      executeLoadQuery,
      loadQueryResult: { loading: queryLoading, error: queryError },
      upsertMutationResult: { loading: upsertLoading },
      serverValidationErrors,
      intl,
      handleSubmit,
      handleCancelBtnClick
    } = useEntityEditor<AssociationO2MTestEntity>({
      loadQuery: LOAD_SCR_ASSOCIATIONO2MTESTENTITY,
      upsertMutation: UPSERT_SCR_ASSOCIATIONO2MTESTENTITY,
      entityName: ENTITY_NAME,
      routingPath: ROUTING_PATH,
      onCommit,
      entityInstance,
      persistEntityCallbacks: useEntityPersistCallbacks(),
      uiKit_to_jmixFront: ant_to_jmixFront,
      useEntityEditorForm: createUseAntdForm(form),
      useEntityEditorFormValidation: createUseAntdFormValidation(form)
    });

    useDefaultEditorHotkeys({ saveEntity: form.submit });

    if (queryLoading) {
      return <Spinner />;
    }

    if (queryError != null) {
      console.error(queryError);
      return <RetryDialog onRetry={executeLoadQuery} />;
    }

    return (
      <Card className={styles.narrowLayout}>
        <Form
          onFinish={handleSubmit}
          onFinishFailed={onSubmitFailed}
          layout="vertical"
          form={form}
          validateMessages={createAntdFormValidationMessages(intl)}
        >
          <Field
            entityName={ENTITY_NAME}
            propertyName="name"
            disabled={readOnlyMode}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <GlobalErrorsAlert serverValidationErrors={serverValidationErrors} />

          <Form.Item style={{ textAlign: "center" }}>
            <Space size={8}>
              <Button htmlType="button" onClick={handleCancelBtnClick}>
                <FormattedMessage
                  id={readOnlyMode ? "common.back" : "common.cancel"}
                />
              </Button>
              {!readOnlyMode && (
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={upsertLoading}
                >
                  <FormattedMessage id={submitBtnCaption} />
                </Button>
              )}
            </Space>
          </Form.Item>
        </Form>
      </Card>
    );
  }
);

registerEntityEditor({
  component: AssociationO2MEditor,
  caption: "screen.AssociationO2MEditor",
  screenId: "AssociationO2MEditor",
  entityName: ENTITY_NAME,
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});

export default AssociationO2MEditor;
