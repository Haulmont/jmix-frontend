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
import { AssociationM2OTestEntity } from "../../jmix/entities/scr_AssociationM2OTestEntity";

const ENTITY_NAME = "scr_AssociationM2OTestEntity";
const ROUTING_PATH = "/associationM2OEditor";

const LOAD_SCR_ASSOCIATIONM2OTESTENTITY = gql`
  query scr_AssociationM2OTestEntityById(
    $id: String = ""
    $loadItem: Boolean!
  ) {
    scr_AssociationM2OTestEntityById(id: $id) @include(if: $loadItem) {
      id
      _instanceName
      name
    }
  }
`;

const UPSERT_SCR_ASSOCIATIONM2OTESTENTITY = gql`
  mutation Upsert_scr_AssociationM2OTestEntity(
    $associationM2OTestEntity: inp_scr_AssociationM2OTestEntity!
  ) {
    upsert_scr_AssociationM2OTestEntity(
      associationM2OTestEntity: $associationM2OTestEntity
    ) {
      id
    }
  }
`;

const AssociationM2OEditor = observer(
  (props: EntityEditorProps<AssociationM2OTestEntity>) => {
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
    } = useEntityEditor<AssociationM2OTestEntity>({
      loadQuery: LOAD_SCR_ASSOCIATIONM2OTESTENTITY,
      upsertMutation: UPSERT_SCR_ASSOCIATIONM2OTESTENTITY,
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
  component: AssociationM2OEditor,
  caption: "screen.AssociationM2OEditor",
  screenId: "AssociationM2OEditor",
  entityName: ENTITY_NAME,
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});

export default AssociationM2OEditor;
