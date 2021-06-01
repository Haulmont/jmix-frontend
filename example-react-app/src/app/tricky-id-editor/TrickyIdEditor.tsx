import React, { useContext } from "react";
import { Form, Alert, Button, Card } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { FormattedMessage } from "react-intl";
import {
  createAntdFormValidationMessages,
  createUseAntdForm,
  createUseAntdFormValidation,
  RetryDialog,
  Field,
  GlobalErrorsAlert,
  Spinner,
  useEntityEditor,
  EntityEditorProps,
  registerEntityEditorScreen
} from "@haulmont/jmix-react-ui";
import { gql } from "@apollo/client";
import "../../app/App.css";
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

    const {
      executeLoadQuery,
      loadQueryResult: { loading: queryLoading, error: queryError },
      upsertMutationResult: { loading: upsertLoading },
      serverValidationErrors,
      intl,
      handleSubmit,
      handleSubmitFailed,
      handleCancelBtnClick
    } = useEntityEditor<TrickyIdTestEntity>({
      loadQuery: LOAD_SCR_TRICKYIDTESTENTITY,
      upsertMutation: UPSERT_SCR_TRICKYIDTESTENTITY,
      entityName: ENTITY_NAME,
      routingPath: ROUTING_PATH,
      onCommit,
      entityInstance,
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
            propertyName="otherAttr"
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

registerEntityEditorScreen(ENTITY_NAME, "trickyIdEditor", <TrickyIdEditor />);

export default TrickyIdEditor;
