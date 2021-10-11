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
import { FormWizardCompositionO2OTestEntity } from "../../jmix/entities/scr_FormWizardCompositionO2OTestEntity";

const ENTITY_NAME = "scr_FormWizardCompositionO2OTestEntity";
const ROUTING_PATH = "/formWizardCompositionO2O";

const LOAD_SCR_FORMWIZARDCOMPOSITIONO2OTESTENTITY = gql`
  query scr_FormWizardCompositionO2OTestEntityById(
    $id: String = ""
    $loadItem: Boolean!
  ) {
    scr_FormWizardCompositionO2OTestEntityById(id: $id)
      @include(if: $loadItem) {
      id
      _instanceName
      name
    }
  }
`;

const UPSERT_SCR_FORMWIZARDCOMPOSITIONO2OTESTENTITY = gql`
  mutation Upsert_scr_FormWizardCompositionO2OTestEntity(
    $formWizardCompositionO2OTestEntity: inp_scr_FormWizardCompositionO2OTestEntity!
  ) {
    upsert_scr_FormWizardCompositionO2OTestEntity(
      formWizardCompositionO2OTestEntity: $formWizardCompositionO2OTestEntity
    ) {
      id
    }
  }
`;

const FormWizardCompositionO2O = observer(
  (props: EntityEditorProps<FormWizardCompositionO2OTestEntity>) => {
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
    } = useEntityEditor<FormWizardCompositionO2OTestEntity>({
      loadQuery: LOAD_SCR_FORMWIZARDCOMPOSITIONO2OTESTENTITY,
      upsertMutation: UPSERT_SCR_FORMWIZARDCOMPOSITIONO2OTESTENTITY,
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
  component: FormWizardCompositionO2O,
  caption: "screen.FormWizardCompositionO2O",
  screenId: "FormWizardCompositionO2O",
  entityName: ENTITY_NAME,
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});

export default FormWizardCompositionO2O;
