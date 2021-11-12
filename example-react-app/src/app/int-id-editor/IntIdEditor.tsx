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
import { IntegerIdTestEntity } from "../../jmix/entities/scr_IntegerIdTestEntity";

const ENTITY_NAME = "scr_IntegerIdTestEntity";
const ROUTING_PATH = "/intIdEditor";

const LOAD_SCR_INTEGERIDTESTENTITY = gql`
  query scr_IntegerIdTestEntityById($id: String = "", $loadItem: Boolean!) {
    scr_IntegerIdTestEntityById(id: $id) @include(if: $loadItem) {
      id
      _instanceName
      description
    }
  }
`;

const UPSERT_SCR_INTEGERIDTESTENTITY = gql`
  mutation Upsert_scr_IntegerIdTestEntity(
    $integerIdTestEntity: inp_scr_IntegerIdTestEntity!
  ) {
    upsert_scr_IntegerIdTestEntity(integerIdTestEntity: $integerIdTestEntity) {
      id
    }
  }
`;

const IntIdEditor = observer(
  (props: EntityEditorProps<IntegerIdTestEntity>) => {
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
    } = useEntityEditor<IntegerIdTestEntity>({
      loadQuery: LOAD_SCR_INTEGERIDTESTENTITY,
      upsertMutation: UPSERT_SCR_INTEGERIDTESTENTITY,
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
            propertyName="description"
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
  component: IntIdEditor,
  caption: "screen.IntIdEditor",
  screenId: "IntIdEditor",
  entityName: ENTITY_NAME,
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});

export default IntIdEditor;
