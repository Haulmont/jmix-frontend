import React, { useContext } from "react";
import { Form, Alert, Button, Card } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { FormattedMessage } from "react-intl";
import {
  createUseAntdForm,
  createUseAntdFormValidation,
  RetryDialog,
  Field,
  GlobalErrorsAlert,
  Spinner,
  useEntityEditorCallbacks,
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
import { DeeplyNestedTestEntity } from "../../jmix/entities/scr_DeeplyNestedTestEntity";

const ENTITY_NAME = "scr_DeeplyNestedTestEntity";
const ROUTING_PATH = "/deeplyNestedTestEntityEditor";

const LOAD_SCR_DEEPLYNESTEDTESTENTITY = gql`
  query scr_DeeplyNestedTestEntityById($id: String = "", $loadItem: Boolean!) {
    scr_DeeplyNestedTestEntityById(id: $id) @include(if: $loadItem) {
      id
      _instanceName
      name
    }
  }
`;

const UPSERT_SCR_DEEPLYNESTEDTESTENTITY = gql`
  mutation Upsert_scr_DeeplyNestedTestEntity(
    $deeplyNestedTestEntity: inp_scr_DeeplyNestedTestEntity!
  ) {
    upsert_scr_DeeplyNestedTestEntity(
      deeplyNestedTestEntity: $deeplyNestedTestEntity
    ) {
      id
    }
  }
`;

const DeeplyNestedTestEntityEditor = observer(
  (props: EntityEditorProps<DeeplyNestedTestEntity>) => {
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
    } = useEntityEditor<DeeplyNestedTestEntity>({
      loadQuery: LOAD_SCR_DEEPLYNESTEDTESTENTITY,
      upsertMutation: UPSERT_SCR_DEEPLYNESTEDTESTENTITY,
      entityName: ENTITY_NAME,
      entityInstance,
      callbacks: useEntityEditorCallbacks({
        routingPath: ROUTING_PATH,
        onCommit
      }),
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
  component: DeeplyNestedTestEntityEditor,
  caption: "screen.DeeplyNestedTestEntityEditor",
  screenId: "DeeplyNestedTestEntityEditor",
  entityName: ENTITY_NAME,
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});

export default DeeplyNestedTestEntityEditor;
