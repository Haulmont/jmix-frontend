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
  registerEntityEditor
} from "@haulmont/jmix-react-web";
import { gql } from "@apollo/client";
import styles from "../../app/App.module.css";
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
    const onSubmitFailed = useSubmitFailedCallback();
    const {
      executeLoadQuery,
      loadQueryResult: { loading: queryLoading, error: queryError },
      upsertMutationResult: { loading: upsertLoading },
      serverValidationErrors,
      intl,
      handleSubmit,
      handleCancelBtnClick
    } = useEntityEditor<DeeplyNestedO2MTestEntity>({
      loadQuery: LOAD_SCR_DEEPLYNESTEDO2MTESTENTITY,
      upsertMutation: UPSERT_SCR_DEEPLYNESTEDO2MTESTENTITY,
      entityName: ENTITY_NAME,
      routingPath: ROUTING_PATH,
      onCommit,
      entityInstance,
      persistEntityCallbacks: useEntityPersistCallbacks(),
      uiKit_to_jmixFront: ant_to_jmixFront,
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
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <GlobalErrorsAlert serverValidationErrors={serverValidationErrors} />

          <Form.Item style={{ textAlign: "center" }}>
            <Space size={8}>
              <Button htmlType="button" onClick={handleCancelBtnClick}>
                <FormattedMessage id="common.cancel" />
              </Button>
              <Button type="primary" htmlType="submit" loading={upsertLoading}>
                <FormattedMessage id={submitBtnCaption} />
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    );
  }
);

registerEntityEditor({
  component: DeeplyNestedO2MTestEntityEditor,
  caption: "screen.DeeplyNestedO2MTestEntityEditor",
  screenId: "DeeplyNestedO2MTestEntityEditor",
  entityName: ENTITY_NAME,
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});

export default DeeplyNestedO2MTestEntityEditor;
