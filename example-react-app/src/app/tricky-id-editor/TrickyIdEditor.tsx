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
import { TrickyIdTestEntity } from "../../jmix/entities/scr_TrickyIdTestEntity";

const ENTITY_NAME = "scr_TrickyIdTestEntity";
const ROUTING_PATH = "/trickyIdEditor";

const LOAD_SCR_TRICKYIDTESTENTITY = gql`
  query scr_TrickyIdTestEntityById($id: String = "", $loadItem: Boolean!) {
    scr_TrickyIdTestEntityById(id: $id) @include(if: $loadItem) {
      id
      _instanceName
      otherAttr
    }
  }
`;

const UPSERT_SCR_TRICKYIDTESTENTITY = gql`
  mutation Upsert_scr_TrickyIdTestEntity(
    $trickyIdTestEntity: inp_scr_TrickyIdTestEntity!
  ) {
    upsert_scr_TrickyIdTestEntity(trickyIdTestEntity: $trickyIdTestEntity) {
      id
    }
  }
`;

const TrickyIdEditor = observer(
  (props: EntityEditorProps<TrickyIdTestEntity>) => {
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
    } = useEntityEditor<TrickyIdTestEntity>({
      loadQuery: LOAD_SCR_TRICKYIDTESTENTITY,
      upsertMutation: UPSERT_SCR_TRICKYIDTESTENTITY,
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
            propertyName="otherAttr"
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
  component: TrickyIdEditor,
  caption: "screen.TrickyIdEditor",
  screenId: "TrickyIdEditor",
  entityName: ENTITY_NAME,
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});

export default TrickyIdEditor;
