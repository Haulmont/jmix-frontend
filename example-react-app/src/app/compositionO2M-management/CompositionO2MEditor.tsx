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
    const onSubmitFailed = useSubmitFailedCallback();
    const {
      executeLoadQuery,
      loadQueryResult: { loading: queryLoading, error: queryError },
      upsertMutationResult: { loading: upsertLoading },
      serverValidationErrors,
      intl,
      handleSubmit,
      handleCancelBtnClick
    } = useEntityEditor<CompositionO2MTestEntity>({
      loadQuery: LOAD_SCR_COMPOSITIONO2MTESTENTITY,
      upsertMutation: UPSERT_SCR_COMPOSITIONO2MTESTENTITY,
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
